// clase con los mètodos y rutas relacionadas con los artìculos de la api, se define el objeto y sus mètodos
'use strict'
var validator = require('validator');
var Article = require('../models/article');

var controller = {
    datosCurso: (req, res) => {
        
        var hola = req.body.hola;
        return res.status(200).send({
            curso: 'Master en frameworks js',
            autor: 'Erick hernandez alumno', 
            url: 'example.com',
            hola
        });
    },

    test: (req, res) => {
        return res.status(200).send({
            message: 'soy el texto de prueba de los artìculos'
        });
    },
// metodos funcionales para la api
    save: (req, res) => {
        //recoger parametros por post
        var params = req.body;
        console.log(params);
        //validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);// true cuando no esté vacío params.title
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content){
            //crear el objeto a guardar
            var article = new Article();
            //asignar valores al objeto
            article.title = params.title;
            article.content = params.content;
            article.image = null;
            //guardar el artìculo
            article.save((err, articleStored) => {
                if(err || !articleStored){
                    return res.status(404).send({
                        status: 'el artìculo no se ha guardado'
                    });
                }
                //devolver una respuesta exitosa de que se guardo el articulo
                return res.status(200).send({
                    status: 'success',
                    article: articleStored
                });
            });
        }else{
            return res.status(200).send({
                status: 'error',
                message: 'Los datos no son validos'
            });
        }
        
    },

    getArticles: (req, res) => {
        var query = Article.find({});
        var last = req.params.last;
        if(last || last != undefined){
            query.limit(5);
        }

        // find metodo
        query.sort('-_id').exec((err, articles) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Problemas para devolver los artìculos'
                });
            }
            if(!articles){
                return res.status(404).send({
                    status: 'error',
                    message: 'No hay artìculos para mostrar'
                });
            }
            return res.status(200).send({
                status: 'success',
                articles
            });
        })
        
    },

    getArticle: (req, res) => {
        //recoger id de la url
        var articleid = req.params.id;
        //comprobar que existe
        if(!articleid || articleid == null){
            return res.status(404).send({
                status: 'error',
                message: 'El artìculo no existe'
            }); 
        }
        //buscar el articulo
        Article.findById(articleid, (err, article) => {
            if(err || !article){
                return res.status(404).send({
                    status: 'error',
                    message: 'No existe el articulo'
                });
            }
             //devolver un json
            return res.status(200).send({
                status: 'success',
                article
            });
        });
       
    },

    update: (req, res) => {
        //recoger id del articulo de la url
        var articleId = req.params.id;
        //recoger los datos que llegan del put
        var params = req.body;
        //validar datos
        try {
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);
        } catch (err) {
            return res.status(200).send({
                status: 'error',
                message: 'Faltan datos por enviar'
            });    
        }
        if(validate_title && validate_content){
            //find and update
            Article.findOneAndUpdate({_id: articleId}, params, {new:true}, (err, articleUpdated) => {
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'error al actualizar'
                    });
                }
                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el artìculo'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                });
            });
        }else{
                //devlver respuesta
            return res.status(200).send({
                status: 'error',
                message: 'La validacion no es correcta'
            });
        }   
    },

    delete: (req, res) =>{
        //recoger id e la url
        var articleId = req.params.id;
        //find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Erroe al borrar'
                });
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'El artìculo que intenta borrar no existe'
                });
            }
            return res.status(200).send({
                status: 'success',
                article: articleRemoved
            })
        });
    },

    upload: (req, res) => {
        /*
        //configurar connect multiparty router/article.js
        //recoger el fichero de la peticion
        var file_name = 'imagen no subida'
        if(!req.files){
            return res.send('Please upload a file')({
                status: 'error',
                message: file_name
            });
        }
        //conseguir el nombre y extension del archivo
        var file_path = req.files.archivo.path;
        var file_split = file_path.split('\\'); 
        //comprobar la extension, solo imagenes, si no es valida borrar
        //si todo es valido
        //buscar el articulo, asignar el nombre de la imagen y actualizarlo
        return res.status(404).send({
            fichero: req.files,
            split: file_split
        });
        */
        var articleId = req.params.id;
        if(req.file){
            var file_path = req.file.path; // file es personalizable
            var file_split = file_path.split('\\');
            var file_name = file_split[2]; // nombre del archivo
            var ext_split = req.file.originalname.split('\.'); // creo fata ;, extensiòn
            var file_ext = ext_split[1]; // ;

            if(file_ext == 'png' || file_ext == 'gif' || file_ext == 'jpg' || file_ext == 'jpeg'){
                Article.findByIdAndUpdate(articleId, {image: file_name}, (err, articleUpdated) => {//antes de la funciòn de callback Vìctor agregò {new:true}
                    if(!articleUpdated){
                        res.status(404).send({message: 'No se pudo actualizar la imagen'});
                    }else{
                        res.status(200).send({article: articleUpdated});
                    }
                }); //creo que falta ;
            }else{
                res.status(200).send({message: 'Extensiòn del archivo no vàlida'}); // borrar el archivo
            }
            console.log(file_path);
        }else{
            res.status(200).send({message: 'No has subido ningùn archivo'}); 
        }
    }// en el video 81 Vìctor agregò ,
}; // end controller

module.exports = controller;