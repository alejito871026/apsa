const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const proveedoresSquema = new Schema({
    rzSocialProveedor : {type:String},
    direccionProveedor : {type:String},
    nitProveedor : {type:String},
});
module.exports = mongoose.model('proveedores',proveedoresSquema);