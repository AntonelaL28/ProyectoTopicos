
function efectoEncima(boton,colorOver) {
  boton.addEventListener("mouseover", () => {
    boton.style.background = colorOver;
    boton.style.color = "white";
  });

  boton.addEventListener("mouseout", () => {
    boton.style.background = ""; 
    boton.style.color = "#7c7b7b";
  });
}


const btCrearP= document.getElementById("botonCrearP");
const btActualizarP= document.getElementById("botonActualizarP");
const btEliminarP= document.getElementById("botonEliminarP");
const btIDP= document.getElementById("botonIDP");
const btCantidadP= document.getElementById("botonCantidadP");
const btTodosP= document.getElementById("botonTodosP");


document.addEventListener('DOMContentLoaded', function() {
  efectoEncima(btCrearP,"#575454","#7c7b7b");
  efectoEncima(btActualizarP,"#575454","#7c7b7b");
  efectoEncima(btEliminarP,"#575454","#7c7b7b");
  efectoEncima(btIDP,"#575454","#7c7b7b");
  efectoEncima(btCantidadP,"#575454","#7c7b7b");
  efectoEncima(btTodosP,"#575454","#7c7b7b");
});
