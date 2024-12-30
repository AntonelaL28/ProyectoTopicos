



function showPage(page) {
  const content = document.getElementById('contenedor');
  content.innerHTML = '';

  if (page === "Crear Chiste") {
    content.innerHTML = `
      <section>
        <h2 class="Subtitulo">¡CREA TU CHISTE!</h2>
        <main class="contendorFormulario">
          <p class="texto">Indique todos los campos del formulario para poder guardar el chiste.</p>
          <label class="texto">
            Texto del Chiste:
            <input type="text" id="txtChisteC"required>
          </label>
          <label class="texto">
             Nombre del Creador:
            <input type="text" id="nomUserC" maxlength="25" required>
          </label>
          <label class="texto">
            Puntaje:
            <select id="puntajeC" required>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
             </select>
          </label>

          <label class="texto">
            Categoría:
            <select id="categoriaC" required>
              <option value="Dad joke">Dad joke</option>
              <option value="Humor Negro">Humor Negro</option>
              <option value="Chistoso">Chistoso</option>
              <option value="Malo">Malo</option>
            </select>
          </label>
          <button id="botonCrear">Crear</button>
          <li id="mensajeId"></li>
        </main>
      </section>
    `;
  } 
  if (page === "Actualizar Chiste") {
    content.innerHTML = `
      <section>
        <h2 class="Subtitulo">¡ACTUALIZA TU CHISTE!</h2>
        <main class="contendorFormulario">
          <p class="texto">Debe de indicar primero el ID para así poder buscar el chiste a ser actualizado.</p>
          <label class="texto">
            ID del Chiste:
            <input type="text" id="IDEscrito">
            <button id="btBuscarChiste">Buscar Chiste</button>
          </label>
          
          <label class="texto">
            Texto del Chiste:
            <input type="text" id="txtChisteA" disabled>
          </label>
          <label class="texto">
             Nombre del Creador:
            <input type="text" id="nomUserA" maxlength="25" disabled>
          </label>
          <label class="texto">
            Puntaje:
            <select id="puntajeA"  disabled>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
             </select>
          </label>
          <label class="texto">
            Categoría:
            <select id="categoriaA" disabled>
              <option value="Dad joke">Dad joke</option>
              <option value="Humor Negro">Humor Negro</option>
              <option value="Chistoso">Chistoso</option>
              <option value="Malo">Malo</option>
            </select>
          </label>
          <button id="btActualizar" disabled>Actualizar</button>
        </main>
      </section>
    `;
  }
  else if (page === "Eliminar Chiste") {
    content.innerHTML = `
      <section class="contendorID">
        <h2 class="Subtitulo">¡ELIMINA TUS CHISTES!</h2>
        <p class="texto">Indica el ID del chiste que quieres eliminar.</p>
        <input type="text" id="txtChisteEliminar">
        <button id="btChisteEliminar">Eliminar</button>
      </section>
    `;
  }
  
}
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
//Funciones para llamar a los endpoints

//Funciones para el post
async function crearChiste() {
  let tupla = [ 
    document.getElementById('txtChisteC').value, 
    document.getElementById('nomUserC').value, 
    parseInt(document.getElementById('puntajeC').value), 
    document.getElementById('categoriaC').value, 
    " "
  ];
  try {
    const response = await fetch("http://localhost:3005/crearChiste", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(tupla)// Enviar la tupla como JSON
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const IDJSON = await response.json();//regresa el ID
    return IDJSON.id;
  } catch (error) {
    console.error(error.message);
  }
}

async function guardarChiste() {
  const btTxt = document.getElementById("txtChisteC");
  const btUser = document.getElementById("nomUserC");
  const btPuntaje = document.getElementById("puntajeC"); 
  const btCategoria = document.getElementById("categoriaC"); 
  const btCrear= document.getElementById("botonCrear");
  btCrear.addEventListener("click", async () => {
    efectoEncima(btCrear,"#575454");
    try { 
      const ID = await crearChiste();
      const contenedorMensaje = document.getElementById("mensajeId");
      contenedorMensaje.innerHTML = '';
      contenedorMensaje.innerHTML = `
        <h3 class="Subtitulo">Este es el ID de tu chiste: ${ID}</h3>
      `;
      btTxt.value=" ";
      btUser.value=" ";
      btPuntaje.value=" ";
      btCategoria.value=" ";
    } catch (error) { 
      console.error('Error al hacer el chiste:', error);
    }
  });
}

//Funciones para el put
async function obtenerID() {
  const btTxt = document.getElementById("txtChisteA");
  const btUser = document.getElementById("nomUserA");
  const btPuntaje = document.getElementById("puntajeA"); 
  const btCategoria = document.getElementById("categoriaA"); 
  const botonBuscar = document.getElementById("btBuscarChiste");
  const btID = document.getElementById("IDEscrito");

  let chisteActualizar;

  botonBuscar.addEventListener("click", async () => {
    efectoEncima(botonBuscar, "#575454");

    try {
      const response = await fetch(`http://localhost:3005/chiste/${btID.value}`);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      chisteActualizar = await response.json(); 

      // Habilitar los campos
      btID.disabled = true;
      btTxt.disabled = false;
      btUser.disabled = false;
      btPuntaje.disabled = false;
      btCategoria.disabled = false;

      // Asignar los valores del JSON a los campos
      btTxt.value = chisteActualizar.TxtChiste;
      btUser.value = chisteActualizar.NomUser; 
      btPuntaje.value = chisteActualizar.Puntaje; 
      btCategoria.value = chisteActualizar.Categoria;
      
      alert("Modifique los campos que considere necesarios del chiste mostrado.");
    } catch (error) {
      alert("¡OCURRIÓ UN ERROR! El ID ingresado no existe. Por favor, ingreselo de nuevo.");
    }
  });

  // Esperar a que chisteActualizar tenga un valor antes de devolverlo
  while (!chisteActualizar) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  return chisteActualizar;
}

async function actualizarChiste() {
  const btTxt = document.getElementById("txtChisteA");
  const btUser = document.getElementById("nomUserA");
  const btPuntaje = document.getElementById("puntajeA"); 
  const btCategoria = document.getElementById("categoriaA"); 
  const botonActualizar = document.getElementById("btActualizar");
  const btID = document.getElementById("IDEscrito");

  let chismeActualizado = await obtenerID();
  botonActualizar.disabled = false;

  botonActualizar.addEventListener("click", async () => {
    efectoEncima(botonActualizar, "#575454");
    try {
      chismeActualizado.TxtChiste = btTxt.value;
      chismeActualizado.NomUser = btUser.value;
      chismeActualizado.Puntaje = btPuntaje.value;
      chismeActualizado.Categoria = btCategoria.value;

      const response = await fetch(`http://localhost:3005/actualizarChiste/${btID.value}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(chismeActualizado) 
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const chistenuevo = await response.json();
      alert("¡El chiste se actualizó exitosamente!");  
      btID.value=" ";
      btTxt.value=" ";
      btUser.value=" ";
      btPuntaje.value=" ";
      btCategoria.value=" ";
      btID.disabled = false;
    } catch (error) {
      alert("¡OCURRIÓ UN ERROR! No se pudo actualizar el chiste.");
    }
  });
}


//Funciones para el delete 
async function eliminarChiste() {
 
  const btEliminar = document.getElementById("btChisteEliminar");

  btEliminar.addEventListener("click", async () => {
    efectoEncima(btEliminar, "#575454");
    try {
      const chisteID = document.getElementById("txtChisteEliminar");
      const response = await fetch(`http://localhost:3005/eliminarChiste/${chisteID.value}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      alert("¡El chiste se eliminó exitosamente!");  
      chisteID.value=" ";
    } catch (error) {
      alert("¡OCURRIÓ UN ERROR! No se econtró el chiste.");
    }
  });
}



const btCrearP= document.getElementById("botonCrearP");
const btActualizarP= document.getElementById("botonActualizarP");
const btEliminarP= document.getElementById("botonEliminarP");
const btIDP= document.getElementById("botonIDP");
const btCantidadP= document.getElementById("botonCantidadP");
const btTodosP= document.getElementById("botonTodosP");



document.addEventListener('DOMContentLoaded', function() {
  showPage("Crear Chiste");  
  efectoEncima(btCrearP,"#575454");
  guardarChiste();

  btCrearP.addEventListener("click", () => {
    efectoEncima(btCrearP,"#575454");
    showPage("Crear Chiste"); 
    guardarChiste();
  });
  btActualizarP.addEventListener("click", () => {
    efectoEncima(btActualizarP,"#575454");
    showPage("Actualizar Chiste"); 
    actualizarChiste();
  
  });
  btEliminarP.addEventListener("click", () => {
    efectoEncima(btEliminarP,"#575454");
    showPage("Eliminar Chiste"); 
    eliminarChiste();
  
  });

  
});