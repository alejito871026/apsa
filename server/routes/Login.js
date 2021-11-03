const express = require('express');
const router = express.Router();
const authe = require('../middlewareServer/authenticacion.js');
const jwt = require('jsonwebtoken')
const secret = process.env.TOK_AUTH
const crypto = require('crypto-js')
const cryptos = require('crypto')
const Empleado = require('../models/Empleado');
const contras = process.env.CONTRAS
const config = {
    authSecret:process.env.TOK_AUTH, // secret for generating jwt token
  }
router.get('/validarToken', authe, async ( req, res)=>{
    return res.status(200).json({
        status:200,
        access:true
    })  
})
router.get('/usuario',async (req, res)=>{
    var token = req.headers.authorization
    if (token) {
        // verifies secret and checks if the token is expired
        jwt.verify(token.replace(/^Bearer\s/, ''), config.authSecret,async (err, decoded)=>{
            if (err) {
                return res.status(401).json({
                success: false,
                message: 'unauthorized'
                })
            }
            if(decoded) {
                const c = decoded.codec
                let ress = {}
                const _id=decoded._id
                let user = await Empleado.findOne({'_id':_id})
                ress.rol = user.rol
                ress.nombreE = user.nombreE
                ress.primerApellidoE = user.primerApellidoE
                ress.segundoApellidoE = user.segundoApellidoE
                ress._id = user._id
                ress.coded = c
                res.json({user:ress})                
            }
        });
    }
    else{
        return res.status(401).json({message: 'unauthorized'})
    }
})
router.post('/recuperarContrasenaCel', async (req, res)=>{  
    console.log(req.body)   
    Empleado.findOne({cedulaE:req.body.codigo},(err, user)=> {
        if(err){
            console.log('error en servidor')
            return res.status(500).json({
                title: 'error en el servidor',
                error:err,
            })                 
        }
        if (!user){
            console.log('no existe cedula')
            return res.json({
                title: 'usuario no existe',
                error: ' cedula no registrada',
                status:202,
                success:false 
            });
        }else if(user.celularE!=req.body.celular){
            return res.json({
                title: 'error en el telefono',
                status:203,
                error: ' ingresaste un telefono erroneo',
                success:false 
            });
        }else{
            let okPass = ''
            let codec =  cargarPass(null,2)            
            codec.then(value=>{
                okPass = value.pass
                let envio = enviarMensajeRecuperacionContrasena(okPass,user)
                envio.then(value=>{
                    if(value===true){
                        var empleado= new Empleado ();
                        contrasenaE = empleado.encryptPassword(okPass)
                        Empleado.updateOne({"_id": user._id },{
                        $set: {"editado":true, "contrasenaE":contrasenaE}
                        },(err, ok)=>{
                            if(err){
                                return res.status(400).json({
                                    title: 'error',
                                    error: 'error al actualizar los datos',
                                    messagge: ' empleado encontrado, celular correcto y mensaje enviado, error al actualizar los datos, intentelo de nuevo',
                                })
                                //aca debemos eliminar todo lo que hayamos causado
                            }
                            if(ok){
                                return res.status(200).json({
                                    title: 'success',
                                    messagge: ' empleado encontrado, celular correcto y mensaje enviado y valores cambiados con exito',
                                    data: 'valores actualizados con exito'
                                })
                            }
                        })
                    }
                    if(value==='Numero de telefono invalido') {
                        return res.status(204).json({
                            title: 'success',
                            messagge: ' empleado encontrado y cedula correcta mensaje no enviado, porfavor intentalo de nuevo',
                            success:true 
                        })
                    }
                })
            })
        }
    });    
        
});
router.post('/iniSesion', async( req, res)=>{
    const cedula = crypto.AES.decrypt(req.body.userIdConnect, contras).toString(crypto.enc.Utf8)
    const contrasena  = crypto.AES.decrypt(req.body.userPassConnect, contras).toString(crypto.enc.Utf8)
    await Empleado.findOne({cedulaE:cedula},(err, user)=> {
        if(err){
            console.log('error en servidor')
            return res.json({
                title: 'error en el servidor',
                error:err,
                status:500
            })                 
        }
        if (!user){
            return res.json({
                title: 'usuario no existe',
                error: ' cedula no registrada',
                success:false,
                status:202
            });
        }else if (!user.compararContrasena(contrasena)){
            return res.json({
                title: 'Error en Contrasena',
                error: 'Contrasena Erronea',
                success:false,
                status:203,
            });
        }
        if(user.activo==true){
            if(user.editado==false){
                //cuando no haya requerido el cambio de contraseña o no sea la primera vez que entra al sistema
                const usuario = {
                    nombre:user.nombreE + user.apellidosE,
                    codigo:user.cedulaE,
                    celular:user.celularE,
                    rol:user.rol,
                }
                let mensaje =  cargarPass(usuario,1)
                mensaje.then(value => {
                    if(value.valid ===true){
                        console.log(value.pass)
                        const payload = {
                            _id:user._id, 
                            codec:crypto.AES.encrypt(value.pass, contras).toString(), 
                        }
                        let token = jwt.sign(payload,secret,{
                            expiresIn: 60 * 60 * 24 / 6
                        })
                        return res.json({ 
                            status:200,
                            token,
                        })
                    }
                    if(value.valid===false){
                        if(value.cod === 101){
                            return res.json({ 
                                status:101,
                                succes:false,
                                error:'numero de telefono invalido'
                            })
                        }
                        //en caso de que se presenten mas errores aca los podremos empezar a listar
                    }
                })            
            }else{
                //para cuando haya requerod el cambio de contraseña o sea la primera vez en el sistema
                const payload = {
                    _id:user._id,
                }
                    let token = jwt.sign(payload,secret,{
                    expiresIn: 60 * 60 * 24 / 6
                })
                res.json({ 
                    success:true,
                    token,
                    status:201
                })
            } 
        }else{
            res.json({ 
                success:false,
                status:209,
                error:'empleado inactivo'
            })
        }
           
    });
});
module.exports = router;
function cargarPass (empleado,n){
    return new Promise((resolve, reject) =>{
        var current_date = (new Date()).valueOf().toString();
        var random = Math.random().toString();
        const aletoria = cryptos.createHash('sha1').update(current_date + random).digest('hex');
        let pass = ''
        for(let a=32; a<39;a++){
            pass = pass + aletoria[a]
        } 
        if(n===1){
            //el siguiebte codigo se escribe para no enviar el mensaje mientras estamos en desarrollo
            let r = {
                pass,
                valid:true
            }
            resolve(r)
            let okEnvio = enviarPass(pass,empleado) //aca ejecturamos el .then 
            okEnvio.then(res => {
                if(res===true){
                    let r = {
                        pass,
                       valid:true
                    }
                    resolve(r)
                }
                if(res==='Numero de telefono invalido') {
                    let r = {
                        cod:101,
                        res,
                        valid:false
                    }
                    resolve(r)
                }
                if(res!=true) {
            //aca validaremos cuando sea falso para enviar a al metodo que pide respuestas que a pasado
                   console.log(res)     
                }
            })            
        }
        if(n===2){
            let r = {
                cod:202,
                pass,
                valid:true
            }
            resolve(r)
        } 
    })   
}
function enviarPass (pass,empleado){
    return new Promise((resolve,reject) => { 
        let fecha = new Date()
        fechaEnvio = fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate()
        /*Instale request ejecutando el comando "npm install --save request" */    
        var requests = require("request");
        let message = 'CONVENIOS APSA notificacion codigo de verificacion '+pass+' ';
        let security = 'c69e76348690224994fce02324f538eb19024406604fa255b4b3e'
        let client = 1942
        let phone2 = empleado.celular.toString()
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
            if (error){
                throw new Error(error)
            } 
            let state = JSON.parse(body)
            if(state.status===1){
                resolve(true);      
            }
            if(state.error){
                resolve(state.msg);                
            }           
        }); 
    })
}
function enviarMensajeRecuperacionContrasena(codec,empleado) {
    return new Promise((resolve,reject) => { 
        /*Instale request ejecutando el comando "npm install --save request" */    
        var requests = require("request");
        let message = 'CONVENIOS APSA codigo recuperacion contraseña '+codec+'; si no ha sido usted, comuniquese con la gerencia';
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
        requests(options, function (error, response, body) {
            if (error){
                throw new Error(error)
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