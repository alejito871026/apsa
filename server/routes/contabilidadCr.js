const express = require('express');
const router = express.Router();
const Creditos = require('../models/Creditos');
const empleadosCreditos = require('../models/empleadosCreditos');
const Ingresos = require('../models/Ingresos');
const pagares = require('../models/pagares.js');
const Egresos = require('../models/Egresos');
const valoresCredito = require('../models/valoresEstadoCredito.js');
const pgt = require('../models/pagosTerceros')
const authe = require('../middlewareServer/authenticacion.js')
router.post('/guardarAbono', authe, async (req, res)=>{
    try {   
        const ingresos = new Ingresos(req.body)
        const ingresoOk = await ingresos.save()
        if(req.body.tipo === 'Pago Unico'){
            const unoOk = await pagares.updateOne({_id:req.body.idPagares, "pagares.estado" : false },{$set:{"pagares.$.abono":req.body.interes+req.body.abono}})
        }else{
            const unoOk = await pagares.updateOne({_id:req.body.idPagares, "pagares.estado" : false },{$set:{"pagares.$.abono":req.body.capital+req.body.interes+req.body.abono}})
        }
        
        const oldValores = await valoresCredito.findOne({'id':req.body.idCredito})  
        const dosOk = await valoresCredito.updateOne({id:req.body.idCredito},{$set:{interes:oldValores.interes-req.body.interes,
            capital:oldValores.capital-req.body.capital,
            total:oldValores.total-req.body.interes-req.body.capital}})
        res.status(200).json({
            success:true
        })
    } catch (error) {
        res.json(error)
    }

})
router.post('/actualizarPagares', authe, async (req, res)=>{
    try {   
        const ingresos = new Ingresos(req.body)
        const ingresoOk = await ingresos.save()
        const unoOk = await pagares.updateOne({_id:req.body.idPagares},{$set:{"pagares":req.body.pagares}})
        const oldValores = await valoresCredito.findOne({'id':req.body.idCredito})  
        const dosOk = await valoresCredito.updateOne({id:req.body.idCredito},{$set:{interes:req.body.nuevoValInteres,
            capital:oldValores.capital-req.body.capital,total:oldValores.total-req.body.nuevoValInteres-req.body.capital}})
            if(ingresoOk && unoOk && dosOk){
                res.status(200).json({
                    success:true
                })
            }else{
                res.status(202).json({
                    success:false,
                    msg:'error en la inserccion de algno de los datos'
                })
            }        
    }catch(error) {
        res.json({
            success:false,
            error
        })
    }
})
router.post('/guardarIngresoCuota', authe, async (req, res)=>{
    try {           
        if(req.body.interesMora>0){
            let valores =  {}
            valores.interesMora = req.body.interesMora
            valores.nombre = req.body.nombre
            valores.numeroCredito = req.body.numeroCredito
            valores.descripcion = 'ingreso interes moratorio de cuota # '+(req.body.index+1)+' Del credito # '+req.body.numeroCredito
            valores.concepto = 'Interes Mora'
            valores.interes = req.body.interesMora
            valores.capital=0
            valores.diasMora = req.body.diasMora
            valores.idCredito = req.body.idCredito
            valores.fechaIngresoEfectivo = req.body.fechaIngresoEfectivo
            valores.codigoEmpleado = req.body.codigoEmpleado
            const ingresos = new Ingresos(valores)
            await ingresos.save()
        }
        let valores = {}
            valores.nombre = req.body.nombre
            valores.numeroCredito = req.body.numeroCredito
            valores.capital=req.body.capital
            valores.interes = req.body.interes
            valores.diasFavor = req.body.diasFavor
            valores.descripcion = req.body.descripcion
            valores.concepto = 'cuota credito'
            valores.fechaIngresoEfectivo = req.body.fechaIngresoEfectivo
            valores.codigoEmpleado = req.body.codigoEmpleado
            valores.idCredito = req.body.idCredito
            const ingresos = new Ingresos(valores)
            await ingresos.save()
        if(req.body.tipo ==='ultimaCuota'){   
            await valoresCredito.deleteOne({'id':req.body.idCredito})
            await pagares.updateOne({_id:req.body.idPagares, "pagares.estado" : false },{$set:{"pagares.$.estado":true,"pagares.$.dias":req.body.cantidadDias,"pagares.$.fechaPago":req.body.fechaIngresoEfectivo}})
            await Creditos.updateOne({_id:req.body.idCredito},{$set:{estado:'terminado', estadoInterno:'terminado'}})
            res.json({success:true})
        }
        if(req.body.tipo ==='pagoCuota'){
            const oldValores = await valoresCredito.findOne({'id':req.body.idCredito})
            await valoresCredito.updateOne({id:req.body.idCredito},{$set:{interes:oldValores.interes-req.body.interes,
                    capital:oldValores.capital-req.body.capital,
                    total:oldValores.total-req.body.interes-req.body.capital}})
            await pagares.updateOne({_id:req.body.idPagares, "pagares.estado" : false },{$set:{"pagares.$.estado":true,"pagares.$.dias":req.body.cantidadDias,"pagares.$.fechaPago":req.body.fechaIngresoEfectivo}})
            await Creditos.updateOne({_id:req.body.idCredito},{$set:{Fp:req.body.proximaFp,valCuotaMens:req.body.valCuotaMens,enMora:req.body.enMora}})
            res.json({success:true})
        }        
    }catch (err){
        res.json({success:true,err})
    }
    
    
    
})
router.post('/cambiarEstado', authe, async(req,res)=>{
    const valoresCredi = await valoresCredito.updateOne({_id:req.body.idEstadoCredito}) ;
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
router.post('/desembolsarOk', authe, async(req,res)=>{
    try{
        const desembolosoOk = await Egresos.updateOne({_id:req.body._id},{$set:{codigoEmpleadoReflejadoEgreso:req.body.codigoEmpleadoReflejadoEgreso,egreso:true,fechaReflejadoEgreso:req.body.fechaReflejadoEgreso}}) ;
        let valores= {
            interes : 0,
            capital:req.body.comision,
            nombre : req.body.nombreCliente,
            numeroCredito : req.body.numCredito,
            descripcion : 'Comision por '+req.body.descripcion+' del credito # '+req.body.numCredito,
            concepto : 'Comision',
            idCredito : req.body.idCredito,
            fechaIngresoEfectivo : req.body.fechaReflejadoEgreso,
            codigoEmpleado : req.body.codigoEmpleadoReflejadoEgreso,
        }
        const comision = new Ingresos(valores)
        const comisionOk = await comision.save()
        let valoresDos = {
            valor:req.body.valor+req.body.cuotaInicial,
            fecha:req.body.fechaReflejadoEgreso,
            entidad:req.body.descripcion,
            codigoEmpleado:req.body.codigoEmpleadoReflejadoEgreso,
        }
        const pagosTerceros = new pgt(valoresDos)
        const PagosT = await pagosTerceros.save()
        if (desembolosoOk && comisionOk &&PagosT){
            res.json({success:true})
        }

    }catch(error){
        res.json({success:false,error})
    }       
})
//esta funcion es para guardar el ingreso de la inicial del credito
router.post('/guardarIngreso', authe, async (req, res)=>{
    const ingresos = new Ingresos(req.body)
    const ok = await ingresos.save()
    if(ok){
        const recibidaInicial =  await Creditos.updateOne({"_id": req.body.idCredito},{$set: {cuotaInicialEntregada: true}})            
        if(recibidaInicial.ok==1){
            const actualizarTablaEmpCreditos = await empleadosCreditos.updateOne({_id:req.body.idEmpleadosCreditos},{$set:{cuotaInicialRecibidaPor:req.body.codigoEmpleado}})       
            if(actualizarTablaEmpCreditos.ok==1){
                return res.status(200).json({
                    success:true
                })
            }else{
                return res.status(401).json({
                    title: 'error',
                    message: 'error al actualizar actualizarTablaEmpCreditos',
                    success:false
                })
            }              
        } else{
            return res.status(402).json({
                title: 'error',
                message: 'error al actualizar actualizarTablaEmpCreditos',
                success:false
            })
        }            
    } 
})
router.post('/pagoTotalCredito', authe, async (req, res)=>{
    try {
        let valores =  {
            interes : req.body.interes,
            capital:req.body.capital,
            nombre : req.body.nombre,
            numeroCredito : req.body.numeroCredito,
            descripcion : req.body.descripcion,
            concepto : 'Pago total',
            idCredito : req.body.idCredito,
            fechaIngresoEfectivo : req.body.fechaIngresoEfectivo,
            codigoEmpleado : req.body.codigoEmpleado,
        }
        const ingresos = new Ingresos(valores)
        const ok = await ingresos.save() 
        if(ok){   
            const ok1 = await valoresCredito.deleteOne({'id':req.body.idCredito})
            const ok2 = await pagares.updateOne({_id:req.body.idPagares},{$set:{pagares:req.body.pagares}})
            const ok3 = await Creditos.updateOne({_id:req.body.idCredito},{$set:{estado:'terminado', estadoInterno:'terminado'}})
            if(ok1&&ok2&&ok3){
                res.json({success:true})
            }else{
                res.json({success:false,msg:'Error al actualizar los valores o los creditos o los pagares'})
            }
        }else{
            res.json({success:false,msg:'Error al guardar el ingreso'})
        }
    } catch (error) {
        conosle.log(error)
        res.json(error)
    }
})
router.post('/guardarEgreso', authe, async (req, res)=>{
    const egresos = new Egresos(req.body)
    egresos.save((err,ok) => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'error al guardar egreso'
            })
        }else{
            return res.status(200).json({
                data: ok,
                success:true
            })
            
        }
    })
})
router.post('/HistorialCredito', authe, async (req, res)=>{
    console.log(req.body.id)
    const ingreso = await Ingresos.find({idCredito:req.body.id})
    console.log(ingreso)
    res.json(ingreso)
}) 
router.post('/pagoUltimaCuotaDisminucionCapital',authe, async (req, res)=>{
    console.log(req.body)
    let valores =  {
        interes : req.body.interes,
        capital:req.body.capital,
        nombre : req.body.nombre,
        numeroCredito : req.body.numeroCredito,
        descripcion : req.body.descripcion,
        concepto : 'cuota credito disminucion capital',
        idCredito : req.body.idCredito,
        fechaIngresoEfectivo : req.body.fechaIngresoEfectivo,
        codigoEmpleado : req.body.codigoEmpleado,
    }
    try {
        const ingresos = new Ingresos(valores)
        const ok1 = await ingresos.save()
        const oldValores = await valoresCredito.findOne({'id':req.body.idCredito})
        if(req.body.tipo === 'ultimaCuota'){
            const ok2 = await valoresCredito.deleteOne({id:req.body.idCredito})
            const ok3 = await Creditos.findByIdAndUpdate({_id:req.body.idCredito},{$set:{estado:'terminado',estadoInterno:'terminado'}})
            const ok4 = await pagares.updateOne({_id:req.body.idPagares},{$set:{pagares:req.body.pagares}})
            if(ok1&&ok2&&ok3&&ok4){
                res.json({success:true})  
            } 
        }else{
            const ok2 = await valoresCredito.updateOne({id:req.body.idCredito},{$set:{interes:oldValores.interes-req.body.oldInteres,
            capital:oldValores.capital-req.body.capital,
            total:oldValores.total-req.body.interes-req.body.capital}})
            const ok3 = await pagares.updateOne({_id:req.body.idPagares},{$set:{pagares:req.body.pagares}})
            if(ok1&&ok2&&ok3){
                res.json({success:true})  
            } 
        }        
              
    } catch (error) {
        res.json({error})
    }
    
})
router.post('/sumarCapitalIngresos',authe, async (req, res)=>{
    let totalCapital = await Ingresos.aggregate([{$group:{_id:null,"totalCapital":{$sum:"$capital"}}}])
    res.status(200).json(totalCapital[0].totalCapital)
})
router.post('/sumarInteresIngresos',authe, async (req, res)=>{
    let totalInteres = await Ingresos.aggregate([{$group:{_id:null,"totalInteres":{$sum:"$interes"}}}])
    return res.status(200).json(totalInteres[0].totalInteres)
})
router.post('/sumarEgresos',authe, async (req, res)=>{
    let totalCapital = await Egresos.aggregate([{ $match: { egreso:true} },{$group:{_id:null,"valor":{$sum:"$valor"}}}])
    let totalInicial = await Egresos.aggregate([{ $match: { egreso:true,cuotaInicial:{$gt:0}}},{$group:{_id:null,"valor":{$sum:"$cuotaInicial"}}}])
    //console.log(totalInicial[0].valor+totalCapital[0].valor)
    let t = totalInicial[0].valor+totalCapital[0].valor
    return res.status(200).json(t)
})
router.post('/sumarCapitalCartera',authe, async (req, res)=>{
    let totalCapitalCartera = await valoresCredito.aggregate([{$group:{_id:null,"valor":{$sum:"$capital"}}}])
    return res.status(200).json(totalCapitalCartera[0].valor)
})
router.post('/sumarInteresCartera',authe, async (req, res)=>{
    let totalInteresCartera = await valoresCredito.aggregate([{$group:{_id:null,"valor":{$sum:"$interes"}}}])
    return res.status(200).json(totalInteresCartera[0].valor)
})

router.post('/ingresosCreditosCapInt',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find( {concepto:{ $in :['cuota credito','Abono','Abono a capital','cuota credito al final','cuota credito disminucion capital','Renovacion','Pago total']}}).sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalIngresosCreditosCapInt',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:{ $in :['cuota credito','Abono','Abono a capital','cuota credito al final','cuota credito disminucion capital','Renovacion','Pago total']}}).countDocuments()
    res.json(total)
})
router.post('/ingresosComision',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find({concepto:'Comision'}).sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/ingresosOtros',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find({concepto:{$in:['Carpeta','Fotocopias','Documentacion']}}).sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalIngresosOtros',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:{$in:['Carpeta','Fotocopias','Documentacion']}}).countDocuments()
    res.json(total)
})
router.post('/totalOtros',authe, async (req, res)=>{
    let totalIngresosOtros = await Ingresos.aggregate([{$match: {concepto:{$in:['Carpeta','Fotocopias','Documentacion']}}},{$group:{_id:null,"valor":{$sum:"$capital"}}}])
    let totalEgresosOtros = await Egresos.aggregate([{$match: {concepto:'Papeleria'}},{$group:{_id:null,"valo":{$sum:"$valor"}}}])
    console.log(totalIngresosOtros)
    console.log(totalEgresosOtros)
    return res.status(200).json({a:totalIngresosOtros[0].valor,b:totalEgresosOtros[0].valo})
})
router.post('/totalIngresosComision',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:'Comision'}).countDocuments()
    res.json(total)
})  
router.post('/ingresosCreditosInteresMora',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find({concepto:'Interes Mora'}).sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalIngresosCreditosInteresMora',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:'Interes Mora'}).countDocuments()
    res.json(total)
})
router.post('/ingresosCreditosInicial',authe, async (req, res)=>{
    let page = (req.body.pagina-1)   
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find({concepto:'inicial'}).populate('idCredito').sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalIngresosCreditosInicial',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:'inicial'}).countDocuments()
    
    res.json(total)
})
router.post('/ingresosVentas',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find({concepto:'ventaEfectivo'}).sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalIngresosVentas',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:'ventaEfectivo'}).countDocuments()
    res.json(total)
})
router.post('/ingresosInversiones',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find({concepto:'otros'}).sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalIngresosInversiones',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:'otros'}).countDocuments()
    res.json(total)
})
router.post('/ingresosCreditosADS',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const ingresos = await Ingresos.find({concepto:'dineroCreditoADS'}).sort({fechaIngresoEfectivo:-1}).skip(skip).limit(20)
    if(ingresos){
        return res.status(200).json({
            ingresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalIngresosCreditosADS',authe, async (req, res)=>{
    let total = await Ingresos.find({concepto:'dineroCreditoADS'}).countDocuments()
    res.json(total)
})

router.post('/egresosCreditos',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const egresos = await Egresos.find({concepto:'desembolso'}).sort({fechaEgreso:-1}).skip(skip).limit(20)
    if(egresos){
        return res.status(200).json({
            egresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalEgresosCreditos',authe, async (req, res)=>{
    let total = await Egresos.find({concepto:'desembolso'}).countDocuments()
    res.json(total)
})
router.post('/egresosCompras',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const egresos = await Egresos.find({concepto:'compras'}).sort({fechaEgreso:-1}).skip(skip).limit(20)
    if(egresos){
        return res.status(200).json({
            egresos,
            success:true,
            status:200
        })
    }
})
router.post('/egresosOtros',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const egresos = await Egresos.find({concepto:'Papeleria'}).sort({fechaEgreso:-1}).skip(skip).limit(20)
    if(egresos){
        return res.status(200).json({
            egresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalEgresosOtros',authe, async (req, res)=>{
    let total = await Egresos.find({concepto:'Papeleria'}).countDocuments()
    res.json(total)
})
router.post('/totalEgresosCompras',authe, async (req, res)=>{
    let total = await Egresos.find({concepto:'compras'}).countDocuments()
    res.json(total)
})
router.post('/egresosAvances',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const egresos = await Egresos.find({concepto:'avance'}).sort({fechaEgreso:-1}).skip(skip).limit(20)
    if(egresos){
        return res.status(200).json({
            egresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalEgresosAvances',authe, async (req, res)=>{
    let total = await Egresos.find({concepto:'avance'}).countDocuments()
    res.json(total)
})
router.post('/egresosFuncionamiento',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const egresos = await Egresos.find({concepto:'funcionamiento'}).sort({fechaEgreso:-1}).skip(skip).limit(20)
    if(egresos){
        return res.status(200).json({
            egresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalEgresosFuncionamiento',authe, async (req, res)=>{
    let total = await Egresos.find({concepto:'funcionamiento'}).countDocuments()
    res.json(total)
})
router.post('/egresosNomina',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const egresos = await Egresos.find({concepto:'nomina'}).sort({fechaEgreso:-1}).skip(skip).limit(20)
    if(egresos){
        return res.status(200).json({
            egresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalEgresosNomina',authe, async (req, res)=>{
    let total = await Egresos.find({concepto:'nomina'}).countDocuments()
    res.json(total)
})
router.post('/egresosTerceros',authe, async (req, res)=>{
    let page = (req.body.pagina-1)  
    let pageSize = 20                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const egresos = await pgt.find().sort({fecha:-1}).skip(skip).limit(20)
    if(egresos){
        return res.status(200).json({
            egresos,
            success:true,
            status:200
        })
    }
})
router.post('/totalEgresosTerceros',authe, async (req, res)=>{
    let total = await pgt.find().countDocuments()
    res.json(total)
})




module.exports = router;