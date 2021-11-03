const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CreditoSquema = new Schema({
    numeroCredito: {type: Number},
    cliente: { type: Schema.Types.ObjectId, ref:'Cliente', required:[true,'_id del cliente obligatorio']},
    nombreCliente:{type:String},
    cedulaCliente:{type:String},
    servicio: { type: String, required:[true,'servicio obligatorio']},//el servicio por el que se hizo el credito
    producto: {type: Schema.Types.ObjectId, ref:'product',default:null},//guardara el id del producto en caso de uqe sea por un producto, el cual ya estara guardado en la bd 
    cantidad:{ type : Number,required:[true,'Cantidad obligatorio']},//es el valor del credito sin interes
    interes:{ type : Number, required:[true,'interes obligatorio']},//es el porcentaje del interes al que se realizara el credito
    cuotaInicial:{ type : Number},    
    tiempo: { type : Number, required:[true,'Direccion obligatorio']},
    frecuencia:{type:String, required:[true,'Direccion obligatorio']},
    interesMensual:{type:Number, required:[true,'interes mensual no llego']},
    pagares:{type:Schema.Types.ObjectId, ref:"pagares", required:[true,'los Pagares no se an guardado']},
    valTotalCred:{type:Number, required:[true,'Direccion obligatorio']},
    valCuotaMens:{type:Number, required:[true,'Direccion obligatorio']},
    fechaAgregado:{ type:Date, required:[true,'fecha obligatorio']},
    estado:{type: String, default:'activo'}, 
    estadoInterno:{type: String, default:'cotizacion'}, 
    enMora:{type:Boolean,default:false},
    clienteInformado:{type: Boolean, default:false},
    cuotaInicialEntregada:{type:Boolean, default:false},
    fiador:{type: Schema.Types.ObjectId, ref:'Fiador'},
    prenda:{type: Schema.Types.ObjectId, ref:'Prenda'},
    infoLab:{type: Schema.Types.ObjectId, ref:'infoLaboral'},
    referidos:{type: Schema.Types.ObjectId, ref:'referidos'},
    fechaEntregado:{ type:Date},
    Fp:{type: Date},
    aumentoPorDias:{type:Number},
    //-----------------------------------------------------
    empleados:{type: Schema.Types.ObjectId, ref:'EmpleadosCredito'},
    //-----------------------------------------------------
    valorTotal:{type:Number},
    impreso:{type:Boolean,default:false},
    compromiso:{type:Boolean,default:false},
    OldValores:{type:Object},
    renovacion:{type:Boolean, default:false},
});

module.exports = mongoose.model('Credito', CreditoSquema);

