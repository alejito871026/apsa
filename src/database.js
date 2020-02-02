const mongoose = require('mongoose');
const {mongodb} = require('./keys');

require ('dotenv').config({path: 'src/variables.env'});
mongoose.connect(process.env.apsaDB,mongodb.options).then (
    ()=> {console.log('base de datos conectada');},
    err => {console.log(err)}
);
