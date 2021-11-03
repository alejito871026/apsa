const express = require('express');
const router = express.Router();
const authe = require('../middlewareServer/authenticacion.js');
const Empleado = require('../models/Empleado');
//const passport = require('passport')
const cryptos = require('crypto')
 
router.post('/registroUnico', async (req,res) => {
    console.log(req.body)
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
router.post('/registro', authe, async  (req, res)=>{ 
    let empleadoNuevo = req.body
    let contrasenaAenviar =  await crearContrasena()
    var empleadoAguardar =  new Empleado (empleadoNuevo);
    empleadoAguardar.contrasenaE=empleadoAguardar.encryptPassword(contrasenaAenviar)
    empleadoAguardar.save((err,ok) => {
        if(err){
            return res.status(202).json({
                title: 'error',
                error: err,
                status:202
            })
        }
        if(ok){   
            let respuesta = envioMensajePassEmpleado(empleadoNuevo,contrasenaAenviar)
            respuesta.then(value =>{
                if(value===true){
                    return res.status(200).json({
                        success: true,
                        msg: 'Empleado Creado y el mensaje enviado exitosamente.', 
                        status:200
                    })
                } 
                if(value==='Numero de telefono invalido') {
                    return res.status(201).json({
                        success: true,
                        codigo:contrasenaAenviar,
                        msg: 'Empleado Creado, mensaje no enviado. ' + value, 
                        status:201
                    }) 
                }                
            })
            respuesta.catch(err =>{
                console.log(err)
            })                                     
        }             
    });     
});
router.post('/cambioContrasena', authe, async (req, res)=>{ 
    const empleado = new Empleado()
    contrasenaEncriptada=empleado.encryptPassword(req.body.contrasenaNueva)
    Empleado.updateOne({"_id": req.body._id},{$set:{"contrasenaE": contrasenaEncriptada,
                        "editado":false}},(err, ok)=>{
        if(err){
            return res.status(204).json({
                title: 'error',
                error: 'error al actualizar informacion del empleado',
                err
            })
        }else{
            return res.status(200).json({                
                data: ok
            })
        }
    });    
});
router.post('/cargarEmpleados',authe , async (req, res) => {
    const empleados = await Empleado.find()
    res.json(empleados)
})
module.exports = router
function envioMensajePassEmpleado (empleado,contrasena){  
    return new Promise((resolve,reject) => {  
    /*Instale request ejecutando el comando "npm install --save request" */    
    const requests = require('request');
    let message = 'CONVENIOS APSA notificacion codigo pass inicio primera vez '+contrasena+' ';
    let security = 'c69e76348690224994fce02324f538eb19024406604fa255b4b3e'
    let client = 1942
    let phone2 = empleado.celularE.toString()
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
    requests(options, (error, response, body) => {
        if (error){
            console.log(error);
        } 
        let state = JSON.parse(body)
            if(state.status===1){
                resolve(true);      
            }
            if(state.error){
                resolve(state.msg);                
            }  
        })            
    })    
}
function crearContrasena (){
    return new Promise((resolve, reject) =>{
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        const aletoria = cryptos.createHash('sha1').update(current_date + random).digest('hex');
        let pass = ''
        for(let a=32; a<39;a++){
            pass = pass + aletoria[a]
        }
        resolve(pass)
    })    
}