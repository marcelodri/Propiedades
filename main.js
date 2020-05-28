/*
---------------------------------------------------------------------------------------------------------------------------------------------------------------
Documento NO RESPONSIVE
1) Se toman las propiedades desde una api con archivo xml. 
2) Se convierten a JSON con xmlToJson 
3) Se hizo un menu para poder filtrar (en tiempo real) las propiedades 
  a) Leemos los datos cargados en el menu de filtro. 
  b) Creamos un elemento con cada una de las propiedades seleccionadas.  
  c) Boton que limpiar el formulario de filtro
4) Boton de mas info, se dirige al link donde esta publicada la propiedad. 
---------------------------------------------------------------------------------------------------------------------------------------------------------------
*/


var data;
var propiedades;

// EventListener
document.getElementById("cargar").addEventListener("click", convert);
document.getElementById("limpiar").addEventListener("click", limpiar);

// Funciones
// Tomo los datos
$(function () {
  $.ajax({
    url: '/prop.xml',
    method: 'GET',
    dataType: 'text',
    success: function (xml) {
      data = xml;
    }
  });
});

// Funcion para convertir el xml a json
function convert() {
  var input = data
  var json = xmlToJson.parse(input);
  propiedades = json.ADS.ad
  limpiar();
  mostrarPropiedades(propiedades);
  const btn = document.querySelector("#cargar");
  btn.style.display = "none";
}

// creo el objeto estatico para realizar el filtrado
let datosBusqueda = {
  region: "", 
  city: "", 
  type: "", 
  rooms: "",
  minimo: "", 
  maximo: "", 
  currency: ""
}

// tomar datos del filtro ---------------------------------------------
const region = document.querySelector("#region");
region.addEventListener('input', (e => {
  datosBusqueda.region = e.target.value  
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));

const city = document.querySelector("#city");
city.addEventListener('input', (e => {
  datosBusqueda.city = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));

const typetodos = document.querySelector("#typetodo");
const typecasa = document.querySelector("#typecasa");
const typedepartamento = document.querySelector("#typedepartamento");
const typeph = document.querySelector("#typeph");
const typeterreno = document.querySelector("#typeterreno");
const typecampo = document.querySelector("#typecampo");
const typequinta = document.querySelector("#typequinta");
typecasa.addEventListener('input', (e => {
  datosBusqueda.type = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));
typedepartamento.addEventListener('input', (e => {
  datosBusqueda.type = e.target.value;
    // llamar funcion de filtrar popiedades. 
    filtrarPropiedades();
  }));
typeph.addEventListener('input', (e => {
  datosBusqueda.type = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));
typeterreno.addEventListener('input', (e => {
  datosBusqueda.type = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));
typecampo.addEventListener('input', (e => {
  datosBusqueda.type = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));
typequinta.addEventListener('input', (e => {
  datosBusqueda.type = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));
                    
const rooms = document.querySelector("#opcionBtn");
rooms.addEventListener('click', (e => {
  datosBusqueda.rooms = e.target.id;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));

const precioCurrency = document.querySelector("#preciocurrency");
precioCurrency.addEventListener('input', (e => {
  datosBusqueda.currency = e.target.defaultValue;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));

const precioCurrency2 = document.querySelector("#preciocurrency2");
precioCurrency2.addEventListener('input', (e => {
  datosBusqueda.currency = e.target.defaultValue;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}));




const inputPreciomin = document.querySelector("#inputPreciomin");
inputPreciomin.addEventListener('input', (e => {
  if(datosBusqueda.currency == "") {
    alert("Para Buscar por Precio Minimo o Maximo, primero debe seleccionar la Moneda USD o ARS")
  } else {
  datosBusqueda.minimo = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
}
}));

const inputPreciomax = document.querySelector("#inputPreciomax");
inputPreciomax.addEventListener('input', (e => {
  if(datosBusqueda.currency == "") {
    alert("Para Buscar por Precio Minimo o Maximo, primero debe seleccionar la Moneda USD o ARS")
  } else {
  datosBusqueda.maximo = e.target.value;
  // llamar funcion de filtrar popiedades. 
  filtrarPropiedades();
  }
}));



// fin de tomar datos del filtro ---------------------------------------------

// Utilizo la funcion xmltojon para convertirlo a JSON
function mostrarPropiedades(propiedades) {  
  const contenedor = document.getElementById("propiedades");

  // Limpiar el html
  while(contenedor.firstChild) {
    contenedor.removeChild(contenedor.firstChild);
  }

  // Construir el html
  propiedades.forEach(e => {


    if(e.pictures.picture.picture_url) {
      var pic = e.pictures.picture.picture_url;
    } else {
        pic = e.pictures.picture[0].picture_url;
    }
    
    var nn;
    if(e.rooms == undefined) {
      nn = 0
    } else {
      nn = e.rooms
    }
    // Crear el elemento PROPIEDAD
    const propHTML = document.createElement("div");
    propHTML.innerHTML = `
    <div class='prop'>  
    <div class="carousel">
      <img class="d-block w-100" src="${pic}" alt="First slide">
    </div>
    <div id="contenido">  
      <h6 id="id">ID: ${e.id}</h6>
      <label id="property_type">${e.property_type}</label>
      <hr style="margin-top: 40px">
      <h6 style="color:green" id="titulo">Provincia: ${e.region}, Localidad: ${e.city} </h6>
      <h6 id="content">Direccion: ${e.address}</h6>
      <h6 id="content">Dormitorios:${nn}.  SupM2: ${new Intl.NumberFormat("de-DE").format(e.plot_area)}</h6>
      <div id="final">
        <h3 style="float: left; margin-top: 5px">${e.price.currency} ${new Intl.NumberFormat("de-DE").format(e.price.text)}</h3>
        <a id="btn" href="${e.url}">MAS INFO</a>
      </div>
    </div>
    </div>
    `
    contenedor.appendChild(propHTML);
  });
}

// funcion de para que se realice el filtro y se envie al constructor del elemento PROPIEDADS
function filtrarPropiedades (p) {
  const resultado = this.propiedades.filter(filtrarRegion).filter(filterCity).filter(filterType).filter(filterRomms).filter(filterCurrency).filter(filterMinimo).filter(filterMaximo);
  mostrarPropiedades(resultado)
}

// funciones de filtrado ---------------------------------------------------
function filtrarRegion (prop) {
  if(datosBusqueda.region){
    return prop.region == datosBusqueda.region;
  } else {
    return prop
  }
}

function filterCity (prop) {
  if(datosBusqueda.city){
    return prop.city == datosBusqueda.city;
  } else {
    return prop
  }
}

function filterType (prop) {
  if(datosBusqueda.type){
    return prop.property_type == datosBusqueda.type;
  } else {
    return prop
  }
}

function filterRomms (prop) {
  if(datosBusqueda.rooms){
    return prop.rooms == datosBusqueda.rooms;
  } else {
    return prop
  }
}

function filterCurrency (prop) {
  if(datosBusqueda.currency){
    return prop.price.currency == datosBusqueda.currency;
  } else {
    return prop
  }
}

function filterMinimo (prop) {
  if(datosBusqueda.minimo){
    return prop.price.text >= datosBusqueda.minimo;
  } else {
    return prop
  }
}

function filterMaximo (prop) {
  if(datosBusqueda.maximo){
    return prop.price.text <= datosBusqueda.maximo;
  } else {
    return prop
  }
}

// limpiar filtros
function limpiar () {
  document.getElementById("region").value = 0;
  document.getElementById("city").value = 0;
  document.querySelector(".form-check-input").checked = false;
  document.querySelector("#preciocurrency").checked = false;
  document.querySelector("#preciocurrency2").checked = false;
  document.getElementById("inputPreciomin").value = "";
  document.getElementById("inputPreciomax").value = "";
  datosBusqueda.region = "", 
  datosBusqueda.city = "", 
  datosBusqueda.type = "", 
  datosBusqueda.rooms = "", 
  datosBusqueda.minimo = "", 
  datosBusqueda.maximo = "", 
  datosBusqueda.currency = "", 
  filtrarPropiedades();

}





