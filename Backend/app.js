//servidor creado con express, recibe peticiones, tutas entre otros màs
'use strict'

//cargar modulos de node para crear servidor
var express = require('express'); //cargar modulo de node para el servidor
var bodyParser = require('body-parser'); // recibir peticiones para convertirlos en JSON

//ejecutar express (http)
var app = express();

//cargar ficheros rutas
var article_routes = require('./routes/article');

//middlewares
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//añadir prefijos a rutas / Cargar rutas
app.use('/api', article_routes);

//exportar modulo actual (fichero actual)
module.exports = app;