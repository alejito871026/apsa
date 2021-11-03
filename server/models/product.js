const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productoSquema = new Schema({
    tipoProducto : {type:String},
    modelo:{type:String},
    referencia: {type:String},
    fechaCompra:{type:Date},
    fechaVenta:{type:Date},
    estado:{type:String},
    valorCompra:{type:Number},
    valorVenta:{type:Number},
    entregado:{type:Boolean, default:false},
    efectivo:{type:Boolean, default:false},
    valorVentaFinal:{type:Number},
    cliente:{ type: Schema.Types.ObjectId, ref:'Cliente'},
    proveedor:{type:String}
});
module.exports = mongoose.model('product',productoSquema);