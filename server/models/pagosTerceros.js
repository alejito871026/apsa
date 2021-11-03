const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PagosTercerosSquema = new Schema({  
    valor: { type: Number},
    fecha:{type: Date},
    entidad:{type: String},
    codigoEmpleado:{type: String},
});

module.exports = mongoose.model('PagosTerceros', PagosTercerosSquema);