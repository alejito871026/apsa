const express = require('express');
const app = require('express')();

//midelwares
app.use(express.json());
app.use(express.urlencoded({extended:true}));



require('./config/database') 
 

//rutas

app.use('/login',require('./routes/Login.js')); 
app.use('/empleados',require('./routes/empleados.js'));
app.use('/clientes',require('./routes/clientes.js'));
app.use('/creditos',require('./routes/creditos.js'));
app.use('/productos',require('./routes/productosCrud.js'));
app.use('/contabilidad',require('./routes/contabilidadCr.js'));
app.use('/compromisos',require('./routes/compromisosCrud.js'));

module.exports = app 

