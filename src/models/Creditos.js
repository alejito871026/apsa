const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditoSquema = new Schema({
    cedula: { type: Number, required:[true,'Nombre obligatorio']},
    servicio: { type: String, required:[true,'Cedula obligatorio']},
    cantidad:{ type : String,required:[true,'Celular uno obligatorio']},
    interes:{ type : Number, required:[true,'Celular dos obligatorio']},
    cuotaInicial:{ type : Number},
    tiempo: { type : Number, required:[true,'Direccion obligatorio']},
    frecuencia:{type:String, required:[true,'Direccion obligatorio']},
    interesMensual:{type:String, required:[true,'interes mensual no llego']},
    valTotalCred:{type:String, required:[true,'Direccion obligatorio']},
    valCuotaMens:{type:String, required:[true,'Direccion obligatorio']},
    fechaAgregado:{ type:String, required:[true,'Direccion obligatorio']},
    estado:{type: String, default:'activo'},
    estadoInterno:{type: String, default:'cotizacion'}, 
    pagares:{type: String},
    numeroCredito: {type: Number},
    fiador:{type: String},
    infoLab:{type: Object},
    referidos:{type: Array},
    creadoPor:{type:String,required:[true,'Creador obligatorio']},
    aprovadoRechazadoPor:{type:String},
    entregadoPor:{type:String},
});

module.exports = mongoose.model('Credito', CreditoSquema);

