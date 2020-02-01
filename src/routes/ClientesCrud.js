const express = require('express');
const router = express.Router();

const Cliente = require('../models/Clientes');
const EditCliente = require('../models/EditCliente');
//get data
router.get('/clientes',async (req, res)=>{ 
     Cliente.find(function(err, clientes){
        if (err){ throw err;}
        else{
            res.json(clientes)
        }
    })
});

router.post('/agregarCliente',async (req, res)=>{
   const cliente= new Cliente (req.body);
    await cliente.save();
    res.json({
        status: 'cliente Guardado'
    })
});

router.post('/busqueda', async (req, res)=>{
    var x =(req.body.cedulaId)
    console.log(x)
    var persona= await Cliente.find({"cedulaId":x})
    res.json(persona)
})


router.post('/verCliente', async (req, res)=>{
    var x =(req.body)
    var persona= await Cliente.find({"cedulaId":x.cedula})
    res.json(persona)
})


router.post('/actualizarCliente',async (req, res, next)=>{
    var persona = await Cliente.find({"cedulaId":req.body.cedulaId})
    if(!persona){
        return next(new Error('no se pudo cargar documento'))
    }else{
        const editado = new EditCliente();
            editado.cedulaIdCliente=req.body.cedulaId,
            editado.modificacion=req.body.modificacion,
            editado.cedulaIdEmpleado=1112762846,
            editado.fechaEdicion=new Date().getDate() + "/" +(new Date().getMonth() + 1) + "/" + new Date().getFullYear(),
            editado.datosAnteriores=persona,
            editado.modificacion=req.body.modificacion,
            console.log(editado)
            await editado.save();
            await Cliente.updateOne({cedulaId:req.body.cedulaId},{
            $set:{
                nombreCliente :req.body.nombreCliente,
                primerApellidoCliente:req.body.primerApellidoCliente,
                segundoApellidoCliente: req.body.segundoApellidoCliente,
                celularUno: req.body.celularUno,
                celularDos: req.body.celularDos,
                direccionCliente: req.body.direccionCliente,
                email: req.body.email,
            }
        })
        res.json({
            status: 'cliente Guardado'
        })
    }
})


router.delete('/clientes:id',(req, res, next)=>{
    Cliente.findByIdAndRemove(req.params.id, function(err, cliente){
        if (err){ res.json(err);}
        else{
            res.json('item eliminado')
        }
    })
})
//rutas de edicion del cliente
router.post('/verEdiciones', async (req, res)=>{
    var x =(req.body)
    var ediciones= await EditCliente.find({"cedulaIdCliente":x.cedula})
    res.json(ediciones)
})

module.exports = router;