const mongoose = require('mongoose');
const bcrypt = require ('bcrypt')
const Schema = mongoose.Schema;
const ClienteSquema = new Schema({
    nombreCliente: { type: String, required:[true,'Nombre obligatorio']},
    primerApellidoCliente:{ type:String, required:[true,'primer Apellido obligatorio']},
    segundoApellidoCliente:{ type:String, required:[true,'segundo Apellido obligatorio']},
    cedulaIdCliente: { type: Number, required:[true,'Cedula obligatorio']},
    celularUnoCliente:{ type : Number, required: [true,'Al menos debes agregar un celular']},
    celularDosCliente:{ type : Number, default:0},
    direccionCliente: { type : String, required:[true,'Direccion obligatorio']},
    barrioCliente:{type:String,required:[true,'barrio obligatorio']},
    ciudadCliente:{type:String,required:[true,'ciudad obligatorio']},
    tViviendaCliente:{type:String, required:[true,'tipo vivienda obligatorio']},
    ocupacionCliente:{type:String, required:[true,'Ocupacion obligatorio']},
    PcargoCliente:{ type : Number, required:[true,'personas a cargo obligatorio']},
    emailCliente:{unique:true, type:String, required:[true,'Email obligatorio']},
    fechaNacCliente:{ type : Date, required:[true,'Fecha Nacimiento obligatorio']},
    fechaAgregadoCliente:{ type:Date,required:[true,'Fecha agregado obligatorio']},
    estadoCliente:{ type:String, default:'Activo'},
});

ClienteSquema.methods.encryptPassword = (contrasena) => {
    return bcrypt.hashSync(contrasena, bcrypt.genSaltSync(10));
};

ClienteSquema.methods.compararContrasena = function (contrasena){
    return bcrypt.compareSync(contrasena, this.contrasena)
};

module.exports = mongoose.model('Cliente', ClienteSquema);