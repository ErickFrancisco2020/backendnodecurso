//alert('hola mundo')
var nombre = "erick hernandez";
var altura = 170;
var conca = nombre + " " + altura;
//document.write(conca);
/*
var datos = document.getElementById("datos");
 datos.innerHTML = `
    <h1>caja de catos</h1>
    <h2> este nombre es: ${nombre}</h2>
    <h3> estatura: ${altura} cm</h3>
 `;

 if(altura >= 170){
     datos.innerHTML += `
     <h1>te falta estatura para llegar allá</h1>
  `;
 }else{
    datos.innerHTML += `
    <h1>super pequeño</h1>`;
 }

 for(var i = 2000; i<=2020; i++){
    datos.innerHTML += "<h2>estamos en el año: </h2>"+ i;  
 }
*/
 function MuestramiNombre(nombre, altura){
    var misdatos =  `
       <h1>caja de catos</h1>
       <h2> este nombre es: ${nombre}</h2>
       <h3> estatura: ${altura} cm</h3>
    `;
    return misdatos;
 }

 function imprimir(){
    var datos = document.getElementById("datos");
    datos.innerHTML = MuestramiNombre("Paco el chato", 175);
 }

 
 imprimir();

 var nombres = ['perro', 'coto', 'gato'];
 /*
 document.write('<h1>Lista de cosas</h1>');
 for(i = 0; i <nombres.length; i++){
     document.write(nombres[i] + '<br/>');
 }
 */
document.write("<h1>Listado de nombres</h1>");
nombres.forEach((nombre) => {
    document.write(nombre + '<br/>');
});

// CREACION DE UN OBJETO LITERAL JSON
var coche = {
   modelo: `Mercedes`,
   maxima: 500,
   antiguedad: 2020,
   mostrarDatos(){
      console.log(this.modelo, this.maxima, this.antiguedad);
   },
   propiedad1: "valor aleatorio"
};

// ACCESO AL CONTENIDO DEL OBJETO
document.write("<h1>"+coche.modelo+"</h1>")
coche.mostrarDatos();
console.log(coche);

// PROMESAS ESTRUCTURA U OBJETO
// pARA PETICIONES ASINCRONAS QUE TARDAN UN TIEMPO EN DEVOLVER UN RESULTADO 
// 
var saludar = new Promise((resolve, reject) => {
   setTimeout (() => {
      let saludo = "Hola a todos desde aqui";
      //saludo = false;
      if(saludo){
         resolve(saludo);
      }else{
         reject(`No hay saludo disponible`);
      }
   }, 2000)
});

saludar.then(resultado => {
  alert(resultado); 
})
.catch(err => {
   alert(err);
});