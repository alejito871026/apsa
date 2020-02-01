const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prendaSquema = new Schema({
    tipoVehiculo: { type: String},
    marca: { type: String},
    modelo: { type: Number},
    tipo: { type: String},
    color: { type: String},
    manifiesto: { type: String},
    licTransito: { type: String},
    placa: { type: String},
    motor: { type: String},
    chasis: { type: String},
    servicio : { type: String},
    cilindraje: { type: String},
    seguro : { type: String},
    venceSeguro: { type: String},
    venceTecno: { type: String},
    numseguro: { type: String},
    tecnicomecanica: { type: String},
    nombrePropietario: { type: String},
    ccPropietario : { type: Number},
    fiador_o_prenda: {type: String},
    fiadorPrenda: {type: Object},
    infolabfiadorPrenda:{type: Object},
});

module.exports = mongoose.model('prenda', prendaSquema);