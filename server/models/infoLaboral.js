const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const infoLaboralSquema = new Schema({
    infoLaboral: {type:Object},
    validadoInfoCliente:{type:Boolean, default:false},
    informacionCliente:{
        visitaOK:{type:Boolean},
        telefonoOk:{ type: Boolean},
        casaOk:{type:Boolean},
        arrendoOk:{type:Boolean},
        negocioOk:{type:Boolean},
        tiempoEnCasa:{type:String},
        Objecion:{ type: String},
        visitadoPor:{ type: Schema.Types.ObjectId, ref:'Empleado'},
    },
    validadoInfoLaboral:{type:Boolean, default:false},
    informacionLaboralCliente:{
        Fcyc:{type:Boolean},//fotocopia camara y comercio
        despDePago:{type:Boolean},
        Fci:{type:Boolean},//fotocopia contrato independiente
        cartaLaboral:{type:Boolean},
        pensionado:{type:Boolean},
        validadoPor:{ type: Schema.Types.ObjectId, ref:'Empleado'},
        Objecion:{ type: String},
    },
});

module.exports = mongoose.model('infoLaboral', infoLaboralSquema);