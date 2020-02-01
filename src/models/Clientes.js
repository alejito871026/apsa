const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClienteSquema = new Schema({
    nombreCliente: { type: String, required:[true,'Nombre obligatorio']},
    primerApellidoCliente:{ type:String, required:[true,'Nombre obligatorio']},
    segundoApellidoCliente:{ type:String, required:[true,'Nombre obligatorio']},
    cedulaId: { type: Number, required:[true,'Cedula obligatorio']},
    celularUno:{ type : Number,required:[true,'Celular uno obligatorio']},
    celularDos:{ type : Number, required:[true,'Celular dos obligatorio']},
    direccionCliente: { type : String, required:[true,'Direccion obligatorio']},
    barrioCliente:{type:String},
    ciudadCliente:{type:String},
    tViviendaCliente:{type:String},
    OcupacionCliente:{type:String},
    PcargoCliente:{ type : Number},
    email:{type:String},
    edadCliente:{ type : Number},
    fechaAgregado:{ type:String},
});

module.exports = mongoose.model('Cliente', ClienteSquema);