const cors = require('cors'); 
const express = require('express');
const morgan = require('morgan')
const path = require('path');
const passport = require ('passport')
const flash = require('connect-flash')
const session = require('express-session')

const app = express();

require('./database') 


//midelwares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(flash())
app.use(passport.initialize());

//rutas 
//app.get('/',function(req, res){
    //res.send('hola mundo');
//});

app.use('/api/login',require('./routes/Login.js'));
app.use('/api',require('./routes/ClientesCrud.js'));
app.use('/api/creditos',require('./routes/CreditosCrud.js'));

//midelware para vuejs reouter modo history
const history = require('connect-history-api-fallback')
app.use(history())
app.use(express.static(path.join(__dirname,'public')));


app.set('port', process.env.PORT ||9000);



app.listen(app.get('port'),() => {
    console.log('server on port', app.get('port'));
});