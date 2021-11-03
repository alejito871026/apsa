const express = require('express');
const router = express.Router();
const authe = require('../middlewareServer/authenticacion.js');
const authe2 = require('../middlewareServer/authenticacionDos.js');
const Cliente = require('../models/Clientes.js');
const EditCliente = require('../models/editCliente.js');
//const Fiador = require('../models/fiador');

router.post('/busqueda', authe2, async (req, res)=>{
    const x =(req.body.cedulaId)
    const cliente = await Cliente.find({"cedulaIdCliente":x})
    if(cliente){
        return res.json({
            cliente,
            status:200,
            success:true
        })
    }
    
}) 
router.post('/busquedaa', authe2, async (req, res)=>{
    const x =(req.body.cedulaId)
    const cliente = await Cliente.find({"cedulaIdCliente":x})
    res.json(cliente)
    
})
router.post('/activos',authe, async (req, res)=>{
    let page = (req.body.pagina)  
    let pageSize = 5                   // Similar a 'límite'
    const skip = (page) * pageSize;        // Para la página 1, el salto es: (0) * 20 => 0 * 20 = 0
    const clientes = await Cliente.find({}).sort({fechaAgregadoCliente:-1}).skip(skip).limit(5)
    if(clientes){
        return res.status(200).json({
            clientes,
            success:true,
            status:200
        })
    }
})
router.post('/totalClientes',authe, async (req, res)=>{
    let total = await Cliente.countDocuments()
    res.json(total)
})
router.post('/registro', authe, async  (req, res)=>{ 
    let clienteNuevo = req.body
    let clienteAguardar =  new Cliente(clienteNuevo);
    clienteAguardar.save((err,ok) => {
        if(err){
            return res.status(202).json({
                title: 'error',
                error: err,
                status:202
            })
        }
        if(ok){   
            return res.status(200).json({
                success: true,
                msg: 'Cliente Creado  exitosamente.', 
                status:200
            })                                    
        }             
    });     
});
router.post('/clienteUnico',authe, async (req, res)=>{
    let clienteUnico = await Cliente.findById({'_id':req.body._id})
    res.json(clienteUnico)
})
router.post('/guardarEdicionCliente', authe, async (req, res, next)=>{
    var persona = await Cliente.find({"_id":req.body._id})
    if(!persona){
        return next(new Error('no se pudo cargar documento'))
    }else{
        let h = new Date()
    let hoy = new Date(h.getFullYear()+'/'+(h.getMonth()+1)+'/'+(h.getDate()))
        const editado = new EditCliente();
            editado.cedulaIdCliente=req.body.cedulaIdCliente;
            editado.modificacion=req.body.descripcionEdicion;
            editado.idEmpleadoEditor=req.body.codigoEmpleadoEditor;
            editado.fechaEdicion=hoy
            editado.datosAnteriores=persona;
            const  guardado = await editado.save();
            if(!guardado){
                res.status(201).json({
                    status: 201,
                    message: 'error al guardar el dato de edicion, porfavor intentelo de nuevo',
                    error:guardado
                })
            }else{     
                const ress = await Cliente.updateOne({_id:req.body._id},{
                    $set:{
                        nombreCliente :req.body.nombreCliente,
                        primerApellidoCliente:req.body.primerApellidoCliente,
                        segundoApellidoCliente: req.body.segundoApellidoCliente,
                        celularUnoCliente: req.body.celularUnoCliente,
                        celularDosCliente: req.body.celularDosCliente,
                        barrioCliente: req.body.barrioCliente,
                        tViviendaCliente: req.body.tViviendaCliente,
                        direccionCliente: req.body.direccionCliente,
                        ciudadCliente: req.body.ciudadCliente,
                        PcargoCliente: req.body.PcargoCliente,
                        emailCliente: req.body.emailCliente,
                    }})
                    if(ress){
                        res.status(200).json({
                            status: 200,
                            message: 'cliente Guardado'
                        })
                    }else{
                        res.status(202).json({
                            status: 202,
                            error:ress,
                            message: 'error al reguardar el cliente'
                        })
                    }
                
            }
        
        
    }
})
router.post('/ediciones',authe, async(req, res)=>{
    const ediciones = await EditCliente.find({'cedulaIdCliente':req.body.cedulaIdCliente}).populate('idEmpleadoEditor')
    res.json(ediciones)
})

module.exports = router;