const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const passport = require('passport')

const Empleado = require('../models/Empleado');

const secret = '*DAhd871026#'
//get data


router.post('/registroUnico', async (req,res) => {
    
    Empleado.countDocuments((err,total)=>{
        if(err){
            console.log('error en servidor')
            return res.status(500).json({
                title: 'error en el servidor',
                error:err,
            })
        }
        if (total==0){
            console.log(total)
            return res.status(200).json({
                title: 'primero',
                error: ' sera el super usuario',
                success:true 
            });
        }else{
            if(total>0){
                console.log(total)
                return res.status(401).json({
                    title: 'ya existe',
                    error: ' ya se registro el super usuario',
                    success:false 
                });
            }
        }
    });
}) 

router.post('/registro', async (req, res)=>{ 
    var empleado= new Empleado (req.body);
    const contra = empleado.contrasenaE
    empleado.contrasenaE=empleado.encryptPassword(contra)
    empleado.save( err => {
        if(err){
            return res.status(400).json({
                title: 'error',
                error: 'cedula registrada'
            })
        } 
        return res.status(200).json({
            success: true,
            msg: 'Empleado Creado', 
        })
    });
});
router.post('/iniSesion',async( req, res, next)=>{
    console.log(req.body)
    const cedula = req.body.cedula
    const contrasena = req.body.contrasena
    console.log(Empleado)
        Empleado.findOne({cedulaE:cedula},(err, user)=> {
            if(err){
                console.log('error en servidor')
                return res.status(500).json({
                    title: 'error en el servidor',
                    error:err,
                }) 
                
            }
            if (!user){
                console.log('usuario no existe')
                return res.status(401).json({
                    title: 'usuario no existe',
                    error: ' cedula no registrada',
                    success:false 
                });
            }
            if (!user.compararContrasena(contrasena)){
                console.log('error en contraseña')
                return res.status(402).json({
                    title: 'Error en Contrasena',
                    error: 'Contrasena Erronea'
                });
            }
                const payload = {
                _id:user._id,
            }
                let token = jwt.sign(payload,secret,{
                expiresIn: 60 * 60 * 24 / 2
            })
                res.status(200).json({ 
                    success:true,
                    token:token
            })
    });
});

router.get('/usuario',(req,res,next)=>{
    let token = req.headers.token;
    jwt.verify(token,secret, (err,decoded)=>{
        if(err){
            console.log(err)
            return res.status(405).json({
                title: 'sin autorizacion',
                success:false
            })
        }else{
            Empleado.findOne({_id:decoded._id},(err, user)=> {
                if (err){
                    return console.log(err)
                }else{
                    return res.status(200).json({
                        title:'usuario logueado',
                        user : {
                            codigo:user.cedulaE,
                            nombre:user.nombreE,
                            apellidouno:user.primerApellidoE,
                            apellidoDos:user.segundoApellidoE,
                            celular:user.celularE,
                            direccion:user.direccionE,
                            rol:user.rol
                        },
                        success:true
                    })
                }
            }) 
        }
    })
})



module.exports = router;