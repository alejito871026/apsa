const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EditClienteSquema = new Schema({
    cedulaIdCliente: { type: Number},
    idEmpleadoEditor:{type:Schema.Types.ObjectId, ref:"Empleado"},
    fechaEdicion:{ type:Date},
    datosAnteriores:{type: Array},
    modificacion:{ type:String}
});

module.exports = mongoose.model('EditCliente', EditClienteSquema);