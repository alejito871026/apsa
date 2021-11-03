//en esta coleccion se guardara la trazabilidad de los cambios realizados 
//las veces que se actuliza la contrasena y la contraseña anterior
// encryptada para  futuras validaciones de cambio de password que 
//no escriba un password que ya halla sido utilizado en ocaciones anteriores 
// o al menos no en las 5 ultimas actualizaciones de pass ejeutadas
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EdicionesEmpleadosSquema = new Schema({
    //AUN NO DECIDIMOS QUE VALORES GUARDAR PARA ESTA FUNCIONS
    id_empleado:{type:String},//no se  define aun si es necesarion hacer referencia a la tabla o solo guardar el id.
    descripcion:{type:String},
    fechaEdicion:{type:Date},
    //de acuerdo a la necesidad se crearan los campos necesarios

});

module.exports = mongoose.model('pagares', EdicionesEmpleadosSquema);