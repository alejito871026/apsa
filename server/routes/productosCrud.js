const express = require('express');
const router = express.Router();
const authe = require('../middlewareServer/authenticacion.js')


const Producto = require('../models/product.js');
const Proveedores = require('../models/proveedores.js');
const Tipo = require('../models/tipo.js');


router.get('/productos', authe, (req,res)=>{
    Producto.find({'entregado':false},function(err, productos){
        if (err){
        console.log(err)}
        else{
            res.json(productos)
        }
    })
})
router.get('/verTipos', authe, (req,res)=>{
    Tipo.find(function(err, tipos){
        if (err){
        console.log(err)}
        else{
            res.json(tipos)
        }
    })
})
router.get('/verProveedores', authe, async (req,res)=>{
    Proveedores.find(function(err, proveedores){
        if (err){
        console.log(err)}
        else{
            res.json(proveedores)
        }
    })
})
router.post('/productosTipo', authe, async  (req,res)=>{
    Producto.find({'tipoProducto':req.body.tip,'entregado':false},function(err, productos){
        if (err){
        console.log(err)}
        else{
            res.json(productos)
        }
    })
})
router.get('/ventasEfectivo', authe, async (req,res)=>{
    const productos = await Producto.find({efectivo:true}).populate('cliente')
    res.json(productos)        
})
router.post('/guardarProducto', authe, async (req,res)=>{
    const prod = new Producto(req.body)
    prod.save(function(err, productos){
        if (err){
            console.log(err)}
        else{
            res.json(productos)
        }
    })
})
router.post('/guardarProveedor', authe, async (req,res)=>{
    const proveedor = new Proveedores (req.body.provee)
    proveedor.save(function(err, ok){
        if (err){
            console.log(err)}
        else{
            res.json(ok)
        }
    })
})
router.post('/guardarNuevoTipo', authe, async (req,res)=>{
    const prod = new Tipo (req.body)
    prod.save(function(err, productos){
        if (err){
            console.log(err)}
        else{
            res.json(productos)
        }
    })
})
router.post('/entregarProducto', authe, async (req, res)=>{ 
    Producto.updateOne({"_id": req.body.id},{
    $set: { "entregado": true, valorVentaFinal:req.body.valorVentaFinal, efectivo:req.body.efectivo,fechaVenta:req.body.fechaVenta,cliente:req.body.cliente}},(err, ok)=>{
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'error al actualizar informacion del cupo'
            })
        }else{
            return res.status(200).json({
                data: ok
            })
        }
    })
})
router.post('/negarCreditoProducto', authe, async (req, res)=>{ 
    Producto.updateOne({"_id": req.body.id},{
    $set: { "entregado": false, valorVentaFinal:0, efectivo:false,fechaVenta:req.body.fechaVenta,cliente:req.body.cliente}},(err, ok)=>{
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'error al actualizar informacion del cupo'
            })
        }else{
            return res.status(200).json({
                data: ok
            })
        }
    })
})


module.exports = router;