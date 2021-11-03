const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const validacionSolicitudSquema = new Schema({
    idCredito:{type: String},
    informacionCliente:{
        visitaOK:{type:Boolean},
        telefonoOk:{ type: Boolean},
        casaOk:{type:Boolean},
        arriendoOk:{type:Boolean},
        negocioOk:{type:Boolean},
        tiempoEnCasa:{type:Number},
        Objecion:{ type: String},
        visitadoPor:{ type:String, default:null}
    },
    informacionLaboralCliente:{
        tipoContrato:{type:String},
        Fcyc:{type:Boolean},//fotocopia camara y comercio
        despDePago:{type:Boolean},
        Fci:{type:Boolean},//fotocopia contrato independiente
        cartaLaboral:{type:Boolean},
        pensionado:{type:Boolean},
        validadoPor:{type:String, default:null},
        Objecion:{ type: String},
    },
    informacionFiador:{
        validadoPor:{type:String, default:null},
        Objecion:{ type: String},
        cartaLabotal:{type:Boolean},
        direccionOk:{type:Boolean},
        telefonoOk:{type:Boolean},
        despDePago:{type:Boolean},
        aceptacion:{type:Boolean},

    },
    informacionPrenda:{
        validadoPor:{type:String, default:null},
        Objecion:{ type: String},
        aceptacion:{type:Boolean},
    },  
});

module.exports = mongoose.model('validacionSolicitud', validacionSolicitudSquema);