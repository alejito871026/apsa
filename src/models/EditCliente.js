const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EditClienteSquema = new Schema({
    cedulaIdCliente: { type: Number},
    cedulaIdEmpleado: { type: Number},
    fechaEdicion:{ type:String},
    datosAnteriores:{type: Array},
    modificacion:{ type:String}
});

module.exports = mongoose.model('EditCliente', EditClienteSquema);