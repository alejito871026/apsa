const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fiadorSquema = new Schema({
    nombreFiador: { type: String},
    primerApellidoFiador:{ type:String},
    segundoApellidoFiador:{ type:String},
    cedulaFiador: { type: Number, unique:true},
    celularUnoFiador:{ type : Number},
    celularDosFiador:{ type : Number},
    direccionFiador: { type : String},
    barrioFiador:{type:String},
    ciudadFiador:{type:String},
    tViviendaFiador:{type:String},
    ocupacionFiador:{type:String},
    PcargoFiador:{ type : Number},
    emailFiador:{type:String},
    edadFiador:{ type : Number},
    fechaAgregado:{ type:String},
    fiador_o_prenda : { type : String},
    infolaboralFiador : {type : Object},
    validadoInfoFiador:{type:Boolean, default:false},
    infoFiador:{
        direccionOk:{type:Boolean},
        despDePago:{type:Boolean},
        cartaLaboral:{type:Boolean},
        telefonoOk:{type:Boolean},
        aceptacion:{type:Boolean},
        validadoPor:{ type: Schema.Types.ObjectId, ref:'Empleado'},
        Objecion:{ type: String},
    },
});

module.exports = mongoose.model('Fiador', fiadorSquema);