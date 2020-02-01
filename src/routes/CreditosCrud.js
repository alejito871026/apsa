const express = require('express');
const router = express.Router();

const Creditos = require('../models/Creditos');
const fiador = require('../models/fiador');
const prenda = require('../models/prenda');
const pagares = require('../models/pagares');

router.post('/FiadorPrenda',async (req,res) => {
    console.log(req.body.id)
    var fiadorOprenda = await fiador.find({"_id":req.body.id})
    if(fiadorOprenda==""){
        var fiadorOprenda = await prenda.find({"_id":req.body.id})   
    }
    console.log(fiadorOprenda[0])
    return res.json(fiadorOprenda[0])
})
router.get('/cuentaCreditos', async (req,res) => {
    Creditos.countDocuments((err,total)=>{
        if(err){
            console.log('error en servidor')
            return res.status(500).json({
                title: 'error en el servidor',
                error:err,
            })
        }else{
                return res.json(total);            
        }
    });
})

router.post('/creditosCliente', async (req, res)=>{
    var x =(req.body)
    var cedula = x.cedulaId
    var credito= await Creditos.find({"cedula":cedula})
    res.json(credito)
})
router.post('/creditosEnMora', async (req, res)=>{
    var x =(req.body)
    var cedula = x.cedulaId
    var enMora= await Creditos.find({"cedula": cedula, "estado":enMora})
    res.json(enMora)
})
router.post('/guardarFiador', async (req, res)=>{
    const Fiador = new fiador (req.body);
    Fiador.save( (err, fiad) => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'error al guardar fiador'
            })
        }else{
            return res.status(200).json({
                data: fiad._id
            })
        }
    });
});
router.post('/guardarPrenda', async (req, res)=>{
    const Prenda = new prenda (req.body);
    Prenda.save( (err, prend) => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'error al guardar prenda'
            })
        }else{
            return res.status(200).json({
                data: prend._id
            })
        }
    });
});
router.post('/guardarPagares',async (req, res)=>{
     const pagos = new pagares (req.body);
     pagos.save( (err, pag) => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'error al guardar los pagares'
            })
        }else{
            return res.status(200).json({ 
                data: pag._id
            })
        }
    });
})
router.post('/guardarCredito',async (req, res)=>{
    const credito= new Creditos (req.body);
        await credito.save((err, cred)=>{
            if(err){
                return res.status(400).json({
                    title:'no creado',
                    error : 'no creado el credito'
                })
            }else{
                return res.status(200).json({
                    title: 'credito Guardado',
                    msg:'credito agregado con exito'
                })
            }
        });
    }); 
router.post('/borrarFiador', async (req, res)=>{
    fiador.deleteOne({"_id":req.body.id_fiador},(err, fiad) => {
        if(err){
            return res.status(400).json({
              title: 'error',
              error: 'error al borrar fiador'
            })
        }else{
            return res.status(200).json({
                success : true
           })
        }
    });
});
router.post('/borrarPagares', async (req, res)=>{
    pagares.deleteOne({"_id":req.body.pag},(err, pagas) => {
        if(err){
            return res.status(400).json({
              title: 'error',
              error: 'error al borrar fiador'
            })
        }else{
            return res.status(200).json({
                success : true
           })
        }
    });
});
 
    router.post('/verCredito',async (req, res)=>{
        const Id= req.body.id;
        const ver = await Creditos.findById(Id)
        res.json(ver);
    })
    
    router.get('/Cotizacion',async(req, res)=>{
        Creditos.find({"estado":"activo", "estadoInterno":"cotizacion"},function(err, creditos){
            if (err){ throw err;}
            else{
                res.json(creditos)
            }
        })
    })
    router.get('/terminados',async(req, res)=>{
        var terminados= await Creditos.find({"estado":'terminado'})
        console.log(terminados)
        res.json(terminados);
    })
    router.get('/enMora',async(req, res)=>{
        var enMora= await Creditos.find({"estado":"activo", "estadoInterno":"en mora"})
        console.log(enMora)
        res.json(enMora);
    })
function siEstaAdentro(req,res,next){
    if(req.siEstaAdentro()){
        return next();
    }
    res.redirect('/inicioSesion')
}
module.exports = router;