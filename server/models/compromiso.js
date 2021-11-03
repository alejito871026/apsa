const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const compromisoSquema = new Schema({
    idCredito:{type: 'string'},
    fechaVencida:{type: 'string'},
    observacion:{type: 'string'},
    fechaCompromiso:{type: 'string'},
})
module.exports = mongoose.model('Compromiso', compromisoSquema);




