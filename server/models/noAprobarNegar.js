const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noAprobarNegarSquema = new Schema({
    idCredito: { type: String},
    texto: { type: String},
    fechaNoAprobacion:{ type:String},
    validadoPor:{type:Number},
});

module.exports = mongoose.model('noAprobarNegar', noAprobarNegarSquema);