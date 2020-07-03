/*Archivo principal para escuchar las peticiones http*/

'use strict'

var mongoose = require('mongoose');//carga modulo
//para evitar problemas con mongoose, también se agrego un segundo parámetro en el json de la conexión
var app = require('./app');
var port = 3900;

mongoose.set('useFindAndModify', false);//forzar a que los metodos antiguos se desactiven
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/api_rest_blog', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    //url, opciones -> permite utilizar nuevas funcionalidades de mongoose, nuevos mètodos
    console.log('La conexiòn es exitosa a db a la api');
    // crear servidor para escuchar peticiones HTTP
    app.listen(port, () => {
        console.log('servidor corriendo en http://localhost:'+port);
    })//port, calback
});

