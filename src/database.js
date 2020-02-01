const mongoose = require('mongoose');
const {mongodb} = require('./keys');

mongoose.connect(mongodb.uri,mongodb.options).then (
    ()=> {console.log('base de datos conectada');},
    err => {err}
    );