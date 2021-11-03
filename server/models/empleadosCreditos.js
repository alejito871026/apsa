const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadosCreditosSquema = new Schema({
    creadoPor:{type: Schema.Types.ObjectId, ref:'Empleado'},
    aprovadoRechazadoPor:{type: Schema.Types.ObjectId, ref:'Empleado'},
    cuotaInicialRecibidaPor:{type: Schema.Types.ObjectId, ref:'Empleado'},
    entregadoPor:{type: Schema.Types.ObjectId, ref:'Empleado'},
});

module.exports = mongoose.model('EmpleadosCredito', empleadosCreditosSquema);