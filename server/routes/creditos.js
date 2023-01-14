const express = require('express');
const router = express.Router();
const schedule = require('node-schedule');
const Creditos = require('../models/Creditos');
const infoLaborall = require('../models/infoLaboral');
const referidoss = require('../models/referidos');
const Pagares = require('../models/pagares');
const fiador = require('../models/fiador');
const prenda = require('../models/prenda');
const empleadosCreditos = require('../models/empleadosCreditos');
const Cliente = require('../models/Clientes.js');
const authe = require('../middlewareServer/authenticacion.js');
const valoresCredito = require('../models/valoresEstadoCredito.js');
const Egresos = require('../models/Egresos');
const Ingresos = require('../models/Ingresos');
const Producto = require('../models/product.js');

router.post('/creditosApagar',authe, async (req, res)=>{
    let start = new Date(req.body.funo)
    let end = new Date(req.body.fdos)
    var credito= await Creditos.find({"estado":"activo","estadoInterno":"Entregado", "Fp":{"$gte" : start,"$lte" : end}}).sort({Fp:1}).populate('cliente')
    res.json(credito)
})
router.post('/fiadorUnico', authe, async (req, res)=>{
    var x =(req.body)
    var Fiador= await fiador.find({"cedulaFiador":x.cedulaFiador})
    console.log(Fiador)
    res.json(Fiador)
})
router.post('/verValoresCredito',authe, async (req, res)=>{
    var x =(req.body._id)
    var valores = await valoresCredito.find({id:x})
    res.json(valores)
})
router.post('/actualizarMora', authe, async (req, res)=>{
    let h = new Date()
    let fecha = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
    try {
        const creditosActivos = await Creditos.find({estado:"activo", estadoInterno:"Entregado"})
        for(let i = 0; i < creditosActivos.length; i++){
            if(fecha>creditosActivos[i].Fp){
                await Creditos.updateOne({_id: creditosActivos[i]._id},{$set:{enMora:true}})
            }
        }
        res.status(200).json({success:true})
    } catch (error) {
        res.status(205).json({success:true,error})
    }
    
})
router.post('/cambiarPagares', authe, async (req, res)=>{
    console.log(req.body)
    try {
       const agregadas = await Pagares.findById(req.body._id)
        console.log(agregadas.agregadas)
        if(agregadas.agregadas<2){
            let total = agregadas.agregadas + 1
            const ok = await Pagares.updateOne({_id:req.body._id},{
                $set:{
                    pagares:req.body.pagares,
                    agregadas:total
            }}) 
            console.log(ok)
            if(ok.ok===1){
                const nuevaFecha = await Creditos.updateOne({_id:req.body.idCredito},{$set:{Fp:req.body.fp}})
                console.log(nuevaFecha)                
                //aca ingresamos el valor del interes de la cuota a la caja
                let valores =  {
                    nombre : req.body.nombre,
                    numeroCredito : req.body.numeroCredito,
                    descripcion : 'ingreso interes de la cuota # '+(req.body.index+1)+' Del credito # '+req.body.numeroCredito+' la cual se pago mediante la opcion de crear nueva cuota',
                    concepto : 'cuota credito al final',
                    interes : req.body.interes,
                    capital : 0,
                    idCredito : req.body.idCredito,
                    fechaIngresoEfectivo : req.body.fechaIngresoEfectivo,
                    codigoEmpleado : req.body.codigoEmpleado,
                }
                const ingresos = new Ingresos(valores)
                await ingresos.save()
                res.status(200).json({success:true})                 
            }else{
                res.status(205).json({
                    success:false,
                    msg:'Error al actualizar los pagares'
                })
            }
        }else{
            res.json({
                success:false,
                msg:'Ya as agotado las dos posibilidades posibles para pasar cuptas al final'
            })
        }
    }catch (error) {
        console.log(error)
        res.json({
            success:false,
            msg:'Ocurrio un error',
            error
        })
    }
    
        
    
})
router.post('/contarCreditos', async (req, res) => {
    const cantidad = await Creditos.countDocuments()
    const antes = 326
    let total = (cantidad + antes)
    res.status(200).json({ 
        total
    })
})
router.post('/guardarCredito', async (req, res) => {
    let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
    console.log(req.body)
    let credito = {} 
    credito.cliente = req.body.cliente 
    credito.servicio = req.body.credito.servicio
    //falta guardar los creditos de productos
    credito.cantidad = req.body.credito.cantidad
    credito.interes = req.body.credito.interes
    credito.cuotaInicial = req.body.credito.inicial
    credito.tiempo = req.body.credito.tiempo
    credito.frecuencia = req.body.credito.frecuencia
    credito.aumentoPorDias = req.body.credito.aumentoPorDias
    credito.interesMensual = req.body.valores.interesMensual
    credito.nombreCliente = req.body.nombreCliente
    credito.cedulaCliente = req.body.cedulaCliente
    let pagos = await guardarPagares(req.body.valores.pagares)
    credito.pagares = pagos._id
    credito.valTotalCred = req.body.valores.valorTotalCredito
    credito.valCuotaMens = req.body.valores.valorCuota
    credito.fechaAgregado = hoy
    if(req.body.credito.producto){
        credito.producto = req.body.credito.producto
    }
    if(req.body.fiador){
        if(req.body.fiador._id){ 
            credito.fiador = req.body.fiador._id
        } else {
            let fiador = await guardarFiador(1,req.body.fiador)
            credito.fiador = fiador._id
        }
    }
    if(req.body.prenda){
        let prenda = await guardarFiador(2,req.body.prenda)
        credito.prenda = prenda._id
    }
    let infoLab = await guardarInfoLaboral(req.body.infoLab)
    credito.infoLab = infoLab._id
    let Referidos = await guardarReferidos(req.body.referidos)
    credito.referidos = Referidos._id
    credito.Fp = pagos.Fp
    let empleado = await guardarEmpleadoCreador(req.body.credito.creadoPor)
    credito.empleados = empleado._id
    credito.valorTotal = req.body.valores.valorTotalCredito
    credito.numeroCredito = await numeroCredito()
    console.log(credito)
    let guardado = new Creditos(credito)
    const ok = await guardado.save()
    console.log(ok)
    res.status(200).json({
        success:true
    })
})
router.post('/guardarRenovacion', async (req, res) => {
    try {
        let empleado = await guardarEmpleadoCreador(req.body.creadoPor)
        let pagos = await guardarPagares(req.body.pagares)
        let guardado = new Creditos(req.body)
        guardado.pagares = pagos._id
        guardado.empleados = empleado._id
        guardado.numeroCredito = await numeroCredito()
        console.log(guardado)
        const ok = await guardado.save()
        console.log(ok)
        const updateCredito = await Creditos.updateOne({_id:req.body.OldValores.id},{$set:{renovacion:true}})
        if(empleado&&pagos&&ok&&updateCredito){
            res.status(200).json({
                success:true
            })
        }        
    } catch (error) {
        console.log(error)
        res.status(200).json({
            success:false,
            error
        })
    }
    
})
router.post('/pagarCreditoAnterior',authe, async (req, res)=>{
    console.log(req.body)
    try {
        let pagares = await Pagares.findById(req.body.pagaresId)
        for(let a = 0; a < pagares.pagares.length; a++){
            if(!pagares.pagares[a].estado){
                console.log(pagares.pagares[a])
                pagares.pagares[a].dias = 0
                pagares.pagares[a].diasFavor = 0
                pagares.pagares[a].diasContra = 0
                pagares.pagares[a].estado = true
                pagares.pagares[a].fechaPago =  req.body.fechaIngresoEfectivo
                pagares.pagares[a].observacion = 'se pago mediante renovacion'
            }
            if(a===pagares.pagares.length-1){
                let pagaresUpdate = await Pagares.updateOne({_id:req.body.pagaresId},{$set:{pagares:pagares.pagares}})
                console.log(pagaresUpdate)       
            }
        } 
        let credito = await Creditos.updateOne({_id:req.body.id},{$set:{estado:'terminado',estadoInterno:'terminado'}})
        let valores = await valoresCredito.findByIdAndDelete(req.body._id)      
        let datos =  {
            nombre : req.body.nombreCliente,
            numeroCredito : req.body.numeroC,
            descripcion : 'Ingreso a capital del credito # '+req.body.numeroC+' El cual se cancelo por renovacion',
            concepto : 'Renovacion',
            interes : req.body.interes,
            capital : req.body.capital,
            idCredito : req.body.id,
            fechaIngresoEfectivo : req.body.fechaIngresoEfectivo,
            codigoEmpleado : req.body.codigoEmpleado,
        }
        let ingreso = new Ingresos(datos)
        let ingresoOk = await ingreso.save()
        console.log(ingresoOk)
        if(pagaresUpdate&&credito&&valores&&ingresoOk){
            res.json({success:true})
        }
    } catch (error) {
        res.json({success:false,error})
    }
})
router.get('/entregadosActivos',authe, async (req, res) => {
    var creditos = await Creditos.find({"estadoInterno":"Entregado","estado":"activo"}).populate('pagares').populate('cliente')
    res.json(creditos)
})
router.get('/valoresCreditos',authe, async (req, res) => {
    var creditos = await valoresCredito.find()
    res.json(creditos)
})
router.post('/creditosCliente',authe, async (req, res)=>{
    var x =(req.body.cedulaId)
    var credito= await Creditos.find({"cedulaCliente":x, "estado":"activo"}).populate('pagares')
    res.json(credito)
})
router.post('/creditosClienteTerminados',authe, async (req, res)=>{
    var x =(req.body.cedulaId)
    var credito= await Creditos.find({cedulaCliente:x, estado:"terminado" ,estadoInterno: 'terminado'}).populate('pagares')
    res.json(credito)
})
router.get('/solicitudes', authe, async (req, res)=>{
    const solicitudes = await Creditos.find({estado:"activo", estadoInterno:"cotizacion"}).populate('cliente')
    res.json(solicitudes)
})
router.get('/rechazos', authe, async (req, res)=>{
    const solicitudes = await Creditos.find({estado:"activo", estadoInterno:"No aprobado"}).populate('cliente')
    res.json(solicitudes)
})
router.get('/terminados', authe, async (req, res)=>{
    const terminados = await Creditos.find({estado:"terminado", estadoInterno:"terminado"}).populate('cliente')
    res.json(terminados)
})
router.get('/negados', authe, async (req, res)=>{
    const terminados = await Creditos.find({estado:"terminado", estadoInterno:"Negado"}).populate('cliente')
    res.json(terminados)
})
router.get('/primeraInstancia', authe, async (req, res)=>{
    const solicitudes = await Creditos.find({estado:"activo", estadoInterno:"primeraEstancia"}).populate('cliente').populate('infoLab').populate('referidos').populate('fiador').populate('prenda').populate('producto')
    res.json(solicitudes)
})
router.get('/aprobados', authe, async (req, res)=>{
    const solicitudes = await Creditos.find({estado:"activo", estadoInterno:"Aprobado"}).populate('cliente').populate('pagares').populate('producto')
    res.json(solicitudes)
})
router.post('/solicitudUnica', authe, async (req, res)=>{
    const solicitudes = await Creditos.findById(req.body._id).populate('cliente').populate('referidos')
    .populate('infoLab').populate('prenda').populate('fiador')
    res.json(solicitudes)
})
router.post('/creditoAnterior', authe, async (req, res)=>{
    const credito = await Creditos.findById(req.body._id).populate('cliente').populate('referidos')
    .populate('infoLab').populate('prenda').populate('fiador')
    res.json(credito)
})
router.post('/actualizarReferencias', authe, async (req, res)=>{
    console.log(req.body._id)
    const ok = await referidoss.updateOne({_id:req.body._id},{
        $set:{
            referidos:req.body.referidos,
            validados:req.body.validados
    }})
    console.log(ok)
    if(ok.ok===1){
        res.status(200).json({success:true})
    }else{
        res.status(205).json({success:false})
    }
})
router.post('/guardarInfoCliente', authe, async (req, res)=>{
    const infoOk = await infoLaborall.updateOne({_id:req.body.id},{$set:{informacionCliente:req.body.informacionCliente,validadoInfoCliente:req.body.validadoInfoCliente}})
    res.status(200).json({data:infoOk._id,success:true})
})
router.post('/guardarInfoLabCliente', authe, async (req, res)=>{
    const infoOk = await infoLaborall.updateOne({_id:req.body.id},{$set:{informacionLaboralCliente:req.body.informacionLaboralCliente,validadoInfoLaboral:req.body.validadoInfoLaboral}})
    res.status(200).json({data:infoOk._id,success:true})
})
router.post('/guardarInfoFiador', authe, async (req, res)=>{
    const infoOk = await fiador.updateOne({_id:req.body.id},{$set:{infoFiador:req.body.infoFiador,validadoInfoFiador:req.body.validadoInfoFiador}})
    res.status(200).json({data:infoOk._id,success:true})
})
router.post('/guardarInfoPrenda', authe, async (req, res)=>{
    const infoOk = await prenda.updateOne({_id:req.body.id},{$set:{infoPrenda:req.body.infoPrenda,validadoInfoPrenda:req.body.validadoInfoPrenda}})
    res.status(200).json({data:infoOk._id,success:true})
})
router.post('/cambiarEstadoInterno', authe, async (req, res)=>{
    if(req.body.fechaEntregado){
        const infoOk = await Creditos.updateOne({_id:req.body.id},{$set:{estadoInterno:req.body.estadoInterno,fechaEntregado:req.body.fechaEntregado}})
        res.status(200).json({data:infoOk._id,success:true})
    }else{
        const infoOk = await Creditos.updateOne({_id:req.body.id},{$set:{estadoInterno:req.body.estadoInterno}})
        res.status(200).json({data:infoOk._id,success:true})
    }
})
router.post('/marcarInformado',authe, async (req, res)=>{
    Creditos.updateOne({"_id": req.body.id },{
        $set: { "clienteInformado": true,}},(err, ok)=>{
            if(err){
                return res.status(400).json({
                    title: 'error',
                    error: 'error al actualizar informacion del cliente'
                })
            }else{
                return res.status(200).json({
                    data: ok,
                    success:true
                })
            }
        })
})
router.post('/recibidaInicial',authe, async (req, res)=>{
    Creditos.updateOne({"_id": req.body.id },{
        $set: { "cuotaInicialEntregada": true,}},(err, ok)=>{
            if(err){
                return res.status(400).json({
                    title: 'error',
                    error: 'error al actualizar informacion del cliente'
                })
            }else{
                return res.status(200).json({
                    data: ok,
                    success:true
                })
            }
        })
})
router.post('/guardarEstado', authe, async(req,res)=>{
    const valoresCredi = new valoresCredito (req.body);
    valoresCredi.save( (err, credit) => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'error al guardar prenda'
            })
        }else{
            return res.status(200).json({
                data: 'valores gurdados con exito',
                success:true,
            })
        }
    });
})
router.post('/nombreYcedula', authe, async(req,res)=>{
    const creditos = await Creditos.find()
    for (let a = 0; a < creditos.length; a++) {
        const idCliente = creditos[a].cliente;
        let cliente = await Cliente.findById(idCliente);
        let nombreCliente = cliente.nombreCliente+' '+cliente.primerApellidoCliente+' '+cliente.segundoApellidoCliente;
        let cedulaCliente = cliente.cedulaIdCliente
        const okNombreYcedula = await Creditos.updateOne({_id:creditos[a]._id},{$set:{nombreCliente,cedulaCliente}})
        console.log(okNombreYcedula)        
    }
    res.status(200).json({success:true})
})
router.post('/creditosClienteActivosNombre', authe, async (req, res)=>{
    const aprobadosCliente = await Creditos.find({nombreCliente: {  $regex :  req.body.nombre , $options:'i'},estado:"activo",estadoInterno:"Entregado"}).populate('cliente')
    res.json(aprobadosCliente)
})
router.post('/creditosClienteActivosCedula', authe, async (req, res)=>{
    var aprobadosCliente = await Creditos.find({cedulaCliente: {  $regex :  req.body.cedula , $options:'i'},estado:"activo",estadoInterno:"Entregado"}).populate('cliente')
    res.json(aprobadosCliente)
})
router.post('/creditosClienteTerminadosNombre', authe, async (req, res)=>{
    const aprobadosCliente = await Creditos.find({nombreCliente: {  $regex :  req.body.nombre , $options:'i'},estado:"terminado",estadoInterno:"terminado"}).populate('cliente')
    res.json(aprobadosCliente)
})
router.post('/creditosClienteTerminadosCedula', authe, async (req, res)=>{
    var aprobadosCliente = await Creditos.find({cedulaCliente: {  $regex :  req.body.cedula , $options:'i'},estado:"terminado",estadoInterno:"terminado"}).populate('cliente')
    res.json(aprobadosCliente)
})
router.post('/verCreditoUnico', authe, async (req, res)=>{
    const credito = await Creditos.findById(req.body._id).populate('cliente').populate('pagares')
    res.json(credito)
})
router.post('/verCreditoUnicoRenovacion', authe, async (req, res)=>{
    console.log(req.body)
    const credito = await Creditos.findById(req.body._id).populate('cliente').populate('pagares').populate('referidos').populate('fiador').populate('prenda').populate('infoLab')
    res.json(credito)
})
router.get('/creditosProductos', authe, async (req, res)=>{
    let creditos = await Creditos.find({ estado:"activo", estadoInterno:{$in:["cotizacion","Aprobado","primeraEstancia","Entregado","noAprobado","Negado","terminado"]},producto:{ $nin:null}}).populate('producto')
    res.json(creditos)
})

router.post('/ingCapFechas', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)  
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var ingCapFechas= await Ingresos.find({concepto:{$in:["cuota credito","Abono","Abono a capital","Pago total","cuota credito al final","cuota credito disminucion capital"]}, fechaIngresoEfectivo:{"$gte" : start,"$lte" : end}})
        res.json(ingCapFechas)   
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var ingCapFechas= await Ingresos.find({concepto:{$in:["cuota credito","Abono","Abono a capital","Pago total","cuota credito al final","cuota credito disminucion capital"]},fechaIngresoEfectivo:{"$gt" : start,"$lt" : fin}})
        res.json(ingCapFechas) 
    }     
}) 
router.post('/ingIntMora', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var ingIntMora= await Ingresos.find({"concepto":"Interes Mora","fechaIngresoEfectivo":{"$gte" : start,"$lte" : end}})
        res.json( ingIntMora) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var ingIntMora= await Ingresos.find({"concepto":"Interes Mora","fechaIngresoEfectivo":{"$gt" : start,"$lt" : fin}})
        res.json( ingIntMora) 
    }
})
router.post('/ingVenEfecFechas', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var ingVentEfectFechas= await Ingresos.find({"concepto":"ventaEfectivo","fechaIngresoEfectivo":{"$gte" : start,"$lte" : end}})
        res.json(ingVentEfectFechas)
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var ingVentEfectFechas= await Ingresos.find({"concepto":"ventaEfectivo","fechaIngresoEfectivo":{"$gt" : start,"$lt" : fin}})
        res.json(ingVentEfectFechas)
    }         
})
router.post('/ingInverFechas', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var ingInvFechas= await Ingresos.find({"concepto":"otros","fechaIngresoEfectivo":{"$gte" : start,"$lte" : end}})
        res.json(ingInvFechas) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var ingInvFechas= await Ingresos.find({"concepto":"otros","fechaIngresoEfectivo":{"$gt" : start,"$lt" : fin}})
        res.json(ingInvFechas) 
    }
})
router.post('/ingComision', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var ingComisionFechas= await Ingresos.find({"concepto":"Comision","fechaIngresoEfectivo":{"$gte" : start,"$lte" : end}})
        res.json(ingComisionFechas) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var ingComisionFechas= await Ingresos.find({"concepto":"Comision","fechaIngresoEfectivo":{"$gt" : start,"$lt" : fin}})
        res.json(ingComisionFechas) 
    }
})
router.post('/ingPapeleria', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var ingComisionFechas= await Ingresos.find({concepto:{$in:['Carpeta','Fotocopias','Documentacion']},fechaIngresoEfectivo:{"$gte" : start,"$lte" : end}})
        res.json(ingComisionFechas) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var ingComisionFechas= await Ingresos.find({concepto:{$in:['Carpeta','Fotocopias','Documentacion']},fechaIngresoEfectivo:{"$gt" : start,"$lt" : fin}})
        res.json(ingComisionFechas) 
    }
})
router.post('/ingInicial', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var ingInicialFechas= await Ingresos.find({"concepto":"inicial","fechaIngresoEfectivo":{"$gte" : start,"$lte" : end}})
        res.json(ingInicialFechas) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var ingInicialFechas= await Ingresos.find({"concepto":"inicial","fechaIngresoEfectivo":{"$gt" : start,"$lt" : fin}})
        res.json(ingInicialFechas) 
    }
})
//estas pertenencen a los egresos 
router.post('/egresoNomina', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var egresoNomina= await Egresos.find({concepto:"nomina",fechaEgreso:{"$gte" : start,"$lte" : end}})
        res.json(egresoNomina)
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var egresoNomina= await Egresos.find({concepto:"nomina",fechaEgreso:{"$gt" :start,"$lt" : fin}})
        res.json(egresoNomina)
    } 
})  
router.post('/egresoAvance', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var egresoAvance= await Egresos.find({concepto:"avance",fechaEgreso:{"$gte" : start,"$lte" : end}})
        res.json(egresoAvance)
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var egresoAvance= await Egresos.find({concepto:"avance",fechaEgreso:{"$gt" :start,"$lt" : fin}})
        res.json(egresoAvance)
    }
})
router.post('/egresoFuncionamiento', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var egresoFuncionamiento= await Egresos.find({concepto:"funcionamiento",fechaEgreso:{"$gte" : start,"$lte" : end}})
        res.json(egresoFuncionamiento) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var egresoFuncionamiento= await Egresos.find({concepto:"funcionamiento",fechaEgreso:{"$gt" :start,"$lt" : fin}})
        res.json(egresoFuncionamiento)
    }
})
router.post('/egresoCompras', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var egresoCompras= await Egresos.find({concepto:"compras",fechaEgreso:{"$gte" : start,"$lte" : end}})
        res.json(egresoCompras) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var egresoCompras= await Egresos.find({concepto:"compras",fechaEgreso:{"$gt" :start,"$lt" : fin}})
        res.json(egresoCompras)
    }
}) 
router.post('/egresoComprasPapeleria', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var egresoCompras= await Egresos.find({concepto:"Papeleria",fechaEgreso:{"$gte" : start,"$lte" : end}})
        res.json(egresoCompras) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var egresoCompras= await Egresos.find({concepto:"Papeleria",fechaEgreso:{"$gt" :start,"$lt" : fin}})
        res.json(egresoCompras)
    }
})             
router.post('/egresosDesembolsos', authe,async (req, res)=>{
    let start = new Date(req.body.fUno)
    if(req.body.fDos!=''){
        let end = new Date(req.body.fDos)
        var egresosDesembolsos = await Egresos.find({concepto:"desembolso",egreso:true, fechaReflejadoEgreso:{"$gte" : start,"$lte" : end}})
        res.json(egresosDesembolsos) 
    }else{
        let fin = new Date(req.body.fUno)
        fin.setDate(fin.getDate()+1)
        var egresosDesembolsos = await Egresos.find({concepto:"desembolso",egreso:true, fechaReflejadoEgreso:{"$gt" :start,"$lt" : fin}})
        res.json(egresosDesembolsos)
    }
})     
router.post('/diaAdia', authe,async (req, res)=>{
    let h = new Date()
    let hoy = new Date(h.getFullYear(),(h.getMonth()),h.getDate(),-5,00,00)
    console.log(hoy)
    const creditos = await Creditos.find({fechaAgregado:{$gte:hoy}})
    const ingresos = await Ingresos.find({fechaIngresoEfectivo:{$gte:hoy}})
    const egresos = await Egresos.find({fechaEgreso:{$gte:hoy}})
    const productos= await Producto.find({fechaCompra:{$gte:hoy}})
    let respuesta = {
        creditos,
        ingresos,
        egresos,
        productos,
    }
    console.log(respuesta)
    res.json(respuesta)     
}) 

module.exports = router;
async function guardarReferidos(referidos) {
    let r = {}
    r.referidos = referidos
    let Referidos = new referidoss(r)
    let rr = await Referidos.save()
    let data = {
        _id : rr._id,
        success:true
    }
    return data
}
async function guardarInfoLaboral(info){
        infoLaboral = info
        let i = {infoLaboral}
        let Info = new infoLaborall(i)
        let  r = await Info.save()
        let data = {
            _id : r._id,
            success:true
        }
        return data
}
//se debe arganizar el guardado del id del fiador cuando ya existe alguno 
async function guardarFiador(n,info){
    if(n===1){
        let Info = new fiador(info)
        let  r = await Info.save()
        let data = {
            _id : r._id,
            success:true
        }
        return data
    }
    if(n===2){
        let Info = new prenda(info)
        let  r = await Info.save()
        let data = {
            _id : r._id,
            success:true
        }
        return data
    }
    console.log(n)
    console.log(info)
}
async function guardarPagares(pagares){
    let Pagos = new Pagares({pagares})
    let  r = await Pagos.save()
    console.log(r)
    let data = {
        Fp:r.pagares[0].fecha,
        _id : r._id,
        success:true
    }
    return data
}
async function guardarEmpleadoCreador(creado){
    let creadoPo = {
        creadoPor:creado
    }
    let Info = new empleadosCreditos(creadoPo)
    let r = await Info.save()
    let data = {
        _id : r._id,
        success:true
    }
    return data
}
async function numeroCredito(){
    const cantidad = await Creditos.countDocuments()
    return cantidad + 1
}
async function creditos (){ 
    let h = new Date()
    let start = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
    let end = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
    start.setDate(end.getDate()-1)
    end.setDate(end.getDate()+1)
    console.log(start)
    console.log(end)
    const cred  = await Creditos.find({"estado":"activo", "estadoInterno":"Entregado","Fp":{"$gt" :start,"$lte" : end}}).populate('cliente')
    return cred
}
const job = schedule.scheduleJob('0 0 8 * * * ', function(){
    creditos().then(val => {
        paraMensajes(val)            
    })
  });
paraMensajes = (creditos)=>{
    let credito = {}
    let x = 0
    let intervalo = setInterval(() => {
        if (x<creditos.length) {
            credito = {
                numero : creditos[x].numeroCredito,
                celular :creditos[x].cliente.celularUnoCliente,
                valor : creditos[x].valCuotaMens,
                fecha : creditos[x].Fp,
            }
            let envio = sending2(credito)
        }else{
            clearInterval(intervalo)
            console.log('cerrando')
        }
        x++;
    }, 1000);
}
function verFecha(fecha){
    var meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
    let fech = new Date (fecha)
    const  y = fech.getDate() +'-'+meses[fech.getMonth()]+'-'+ fech.getFullYear() 
    return y         
}
function sending2(cliente){
    console.log(cliente)
    let fecha = verFecha(cliente.fecha)
    console.log(fecha)
    //Instale request ejecutando el comando "npm install --save request"    
    var requests = require("request");
    let message = 'CONVENIOS APSA le recuerda el pago oportuno de su CUOTA. Fecha próxima de pago: '+fecha+' del crédito #'+cliente.numero+' por valor de '+cliente.valor+'.'
    let security = 'c69e76348690224994fce02324f538eb19024406604fa255b4b3e'
    let client = 1942
    let phone2 = cliente.celular.toString()
    var options = { 
    method: 'POST',
    url: 'https://www.onurix.com/api/v1/send-sms',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    formData: {
        key:security,
        client:client,
        phone:'+57'+phone2,
        sms:message,
        'country-code':'CO'
            }
    };

    requests(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    }); 
}
