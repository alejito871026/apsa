const mongoose = require('mongoose');
const bcrypt = require ('bcrypt')
const Schema = mongoose.Schema;

const EmpleadoSquema = new Schema({
    nombreE: { type: String, required:[true,'Nombre obligatorio']},
    primerApellidoE:{ type:String, required:[true,'Nombre obligatorio']},
    segundoApellidoE:{ type:String, required:[true,'Nombre obligatorio']},
    cedulaE: {unique:true, type: Number, required:[true,'Cedula obligatorio']},
    contrasenaE: { type: String, required:[true,'Contraseña obligatorio']},
    celularE:{ type : Number,required:[true,'Celular obligatorio']},
    direccionE: { type : String, required:[true,'Direccion obligatorio']},
    emailE:{type:String, required:[true,'Email obligatorio']},
    rol:{ type:String, required:[true,'rol obligatorio']},
    fechaAgregado:{ type:String, required:[true,'Fecha Agregado obligatorio']},
    fechaNacE:{ type:String, required:[true,'Fecha Nacimiento obligatorio']},
});

EmpleadoSquema.methods.encryptPassword = (contrasenaE) => {
    return bcrypt.hashSync(contrasenaE, bcrypt.genSaltSync(10));
};

EmpleadoSquema.methods.compararContrasena = function (contrasenaE){
    return bcrypt.compareSync(contrasenaE, this.contrasenaE)
};

module.exports = mongoose.model('Empleado', EmpleadoSquema);