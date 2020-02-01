const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fiadorSquema = new Schema({
    nombreFiador: { type: String},
    primerApellidoFiador:{ type:String},
    segundoApellidoFiador:{ type:String},
    cedulaFiador: { type: Number},
    celularUnoFiador:{ type : Number},
    celularDosFiador:{ type : Number},
    direccionCliente: { type : String},
    barrioFiador:{type:String},
    ciudadFiador:{type:String},
    tViviendaFiador:{type:String},
    OcupacionFiadore:{type:String},
    PcargoFiador:{ type : Number},
    emailFiador:{type:String},
    edadFiador:{ type : Number},
    fechaAgregado:{ type:String},
    fiador_o_prenda : { type : String}
});

module.exports = mongoose.model('fiador', fiadorSquema);