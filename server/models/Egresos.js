const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EgresosSquema = new Schema({
    concepto : { type : String},
    valor: { type: Number},
    descripcion: { type: String},
    codigoEmpleado:{ type:Schema.Types.ObjectId, ref:'Empleado'},
    idCredito:{type : String},
    cuotaInicial:{type:Number},
    numCredito:{type:Number},
    fechaEgreso:{type: Date},
    egreso:{type:Boolean},
    codigoEmpleadoReflejadoEgreso:{type: String},
    fechaReflejadoEgreso:{type: Date},
    cedula:{type:String},
    nombreCliente:{type:String}
});

module.exports = mongoose.model('Egresos', EgresosSquema);