const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tipoSquema = new Schema({
    tipoProducto : {type:String},
});
module.exports = mongoose.model('tipo',tipoSquema);