const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagaresSquema = new Schema({
    numero : {type : Number},
    pagares: { type:Array},
});

module.exports = mongoose.model('pagares', pagaresSquema);