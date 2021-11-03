const express = require('express');
const router = express.Router();
const authe = require('../middlewareServer/authenticacion.js');
const Compromiso = require('../models/compromiso.js');
const Creditos = require('../models/Creditos.js');
const Pagares = require('../models/pagares.js');

/* router.post('/actualizar',authe, async(req, res)=>{
    var frecuencia = await Creditos.updateOne({"_id":req.body.idCredito},{$set:{"frecuencia":req.body.b}})
    res.json(frecuencia);
}) */
router.post('/nuevoCompromiso',authe, async(req, res)=>{
    console.log(req.body)
    const nuevoCompromiso = new Compromiso(req.body);
    var compromiso = await nuevoCompromiso.save()
    res.json(compromiso);
})
router.post('/compromisoVerdadero',authe, async(req, res)=>{
    console.log(req.body.id)
    var verdadero = await Creditos.updateOne({"_id":req.body.id},{$set:{"compromiso":true}})
    res.json(verdadero);
})
router.post('/verCompromiso',authe, async(req, res)=>{
    console.log(req.body.idCredito)
    var comprimiso = await Compromiso.findOne({"idCredito":req.body.idCredito})
    res.json(comprimiso);
})
router.post('/pagares',authe, async(req, res)=>{
    console.log(req.body)
    var pagares = await Pagares.findById(req.body.id)
    res.json(pagares);
})
router.get('/enMora',authe, async(req, res)=>{
    Creditos.find({"estado":"activo", "estadoInterno":"Entregado", "enMora": true},function(err, creditos){
        if (err){ throw err;}
        else{
            res.json(creditos)
        }
    })
})
module.exports = router; 