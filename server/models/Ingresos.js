const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const IngresosSquema = new Schema({
    concepto: { type : String},
    capital: { type: Number},
    interes:{type: Number},
    nombre: { type:String},
    numeroCredito: { type:Number},
    descripcion : { type : String},
    idCredito: { type: Schema.Types.ObjectId, ref:'Credito'},
    codigoEmpleado:{ type:String},
    fechaIngresoEfectivo:{type: Date},
});

module.exports = mongoose.model('Ingresos', IngresosSquema);