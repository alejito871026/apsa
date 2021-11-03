const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pagaresSquema = new Schema({
    pagares: {type:Array},
    agregadas: {type:Number, default:0}
});

module.exports = mongoose.model('pagares', pagaresSquema);