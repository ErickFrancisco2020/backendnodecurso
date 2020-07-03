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

//añadir prefijos a rutas / Cargar rutas
app.use('/api', article_routes);

//exportar modulo actual (fichero actual)
module.exports = app;