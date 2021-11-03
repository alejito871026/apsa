const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const valoresCreditoSquema = new Schema({
    id : { type:String},
    numeroC:{type:Number},
    cedula:{ type:Number},
    nombreCliente:{type:String},
    enMora:{ type:Boolean},
    interes:{ type:Number},
    capital:{ type:Number},
    total:{ type:Number},
});

module.exports = mongoose.model('valoresCredito', valoresCreditoSquema);