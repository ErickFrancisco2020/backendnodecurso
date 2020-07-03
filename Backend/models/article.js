//modelo de la aplicación
//clase para crear diferentes objetos, propiedades del objeto y estructura para conectarse a la colección de artículos, para crear un nuevo artículo se utilizará este molde
'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema; //objeto de este tipo

var ArticleSchema = Schema({// base del documento que se guarda en la db
    title: String, // se define el tipo al utilizar mongoose
    content: String,
    date: {type: Date, default: Date.now},
    Image: String
});

module.exports = mongoose.model('Article', ArticleSchema);//nombre del modelo, esquema del modelo
// articles --> guarda documentos de este tipo y con esta estructura dentro de la colecciòn
