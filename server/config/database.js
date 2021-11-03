
const mongoose = require('mongoose');
const {mongodb} = require('./llavesBD.js');

mongoose.connect(mongodb.uri,mongodb.options).then (
    ()=> {console.log('base de datos conectada');},
    err => {
        console.log(err)
    }
);