const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const referidosSquema = new Schema({  
    referidos: [{type:Object}],
    validados:{type:Boolean,default:false}
});

module.exports = mongoose.model('referidos', referidosSquema);