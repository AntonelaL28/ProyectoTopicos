
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
  if (page === "Eliminar Chiste") {
    content.innerHTML = `
      <section class="contendorID">
        <h2 class="Subtitulo">¡ELIMINA TUS CHISTES!</h2>
        <p class="texto">Indica el ID del chiste que quieres eliminar.</p>
        <input type="text" id="txtChisteEliminar">
        <button id="btChisteEliminar">Eliminar</button>
      </section>
    `;
  }
  if (page === "Cantidad de Chistes") {
    content.innerHTML = `
      <section>
        <h2 class="Subtitulo">Obtener la Cantidad de Chistes por Categoría</h2>
        <main class="contendorFormulario">
          <p class="texto" id="labelCantPunt">Indique la categoría para mostrar la cantidad de chistes.</p>
          <label class="texto" id="labelCantPunt">
            Categoría:
            <select id="categoriaCantidad">
              <option value="" selected>Seleccione</option>
              <option value="Dad joke">Dad joke</option>
              <option value="Humor Negro">Humor Negro</option>
              <option value="Chistoso">Chistoso</option>
              <option value="Malo">Malo</option>
            </select>
          </label>
          <button id="botonCantidad" onclick="obtenerCantidadChistesPorCategoria()">Obtener Cantidad</button>
          <div id="resultadoCantidadChistes"></div>
        </main>
      </section>
    `;
  }
  if (page === "Obtener Chistes por Puntaje") {
    content.innerHTML = `
      <section>
        <h2 class="Subtitulo">Obtener Chistes por Puntaje</h2>
        <main class="contendorFormulario">
          <p class="texto" id="labelCantPunt">Indique el puntaje para mostrar los chistes.</p>
          <label class="texto" id="labelCantPunt">
            Puntaje:
            <input type="number" id="puntajeChistes" min="1" max="10" required>
          </label>
          <button id="botonPuntaje" onclick="obtenerChistesPorPuntaje()">Obtener Chistes</button>
          <div id="resultadoChistesPuntaje"></div>
        </main>
      </section>
    `;
  }
  if (page === "Obtener Chiste") {
    content.innerHTML = `
      <section>
        <h2 class="Subtitulo">¡OBTENER CHISTE!</h2>
        <main class="contenedorFormulario">
          <label class="texto" id="labelTipoChiste">
            Tipo de chiste: 
            <select id="tipoChiste">
              <option value="" selected>Seleccione</option> 
              <option value="Chuck">Chuck</option> 
              <option value="Dad">Dad</option> 
              <option value="Propio">Propio</option> 
            </select> 
          </label>
          <button id="botonChiste" onclick="obtenerChiste()">Obtener Chiste</button>
          <div id="resultadoChiste"></div> 
        </main> 
      </section>
    `;
  }
  if (page === "Obtener Chistes por ID") {
    content.innerHTML = `
      <section>
        <h2 class="Subtitulo">¡OBTENER CHISTE POR ID!</h2>
        <main class="contendorFormulario">
          <label class="texto" id="labelChisteId">
            ID del Chiste:
            <input type="text" id="idChiste" required>
          </label>
          <button id="botonId">Obtener Chiste por ID</button>
          <div id="resultadoChisteId"></div>
        </main>
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

//función para obtener la cantidad de chistes por categoría
async function obtenerCantidadChistesPorCategoria() {
  const categoria = document.getElementById('categoriaCantidad').value;
  const btCantidad = document.getElementById('botonCantidad');
  btCantidad.addEventListener("click", async () => {
    efectoEncima(btCantidad, "#575454");
  });
  if (categoria === "") {
    //alert("Por favor, seleccione una categoría.");
    return;
  }
  try {
    const response = await fetch(`http://localhost:3005/cantidadChistes/${categoria}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No hay chistes en esta categoría');
      }
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    //para mostrar el resultado:
    const contenedorResultado = document.getElementById('resultadoCantidadChistes');
    contenedorResultado.innerHTML = `
      <h3 class="Subtitulo"> Hay ${data.cantidad} chiste(s) en la categoría ${data.categoria}</h3>
    `;
  } catch (error) {
    alert(error.message || "Ocurrió un error al obtener la cantidad de chistes por categoría");
  }
}

//función para obtener todos los chistes por puntaje
async function obtenerChistesPorPuntaje() {
  const puntaje = document.getElementById('puntajeChistes').value;
  const btPuntaje = document.getElementById('botonPuntaje');
  btPuntaje.addEventListener("click", async () => {
    efectoEncima(btPuntaje, "#575454");
  });
  if (puntaje === "") {
    //alert("Por favor, seleccione un puntaje.");
    return;
  }
  try {
    const response = await fetch(`http://localhost:3005/chistesPuntaje/${puntaje}`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No hay chistes en este puntaje');
      }
      throw new Error(`Response status: ${response.status}`);
    }
    const chistes = await response.json();
    //para mostrar el resultado:
    const contenedorResultado = document.getElementById('resultadoChistesPuntaje');
    contenedorResultado.innerHTML = '';
    if (chistes.length > 0) {
      chistes.forEach(chiste => {
        const div = document.createElement('div');
        div.innerHTML = `
          <p class="texto">Texto del Chiste: ${chiste.TxtChiste}</p>
          <p class="texto">Nombre del Usuario: ${chiste.NomUser}</p>
          <p class="texto">Puntaje: ${chiste.Puntaje}</p>
          <p class="texto">Categoría: ${chiste.Categoria}</p>
          <p class="texto">ID: ${chiste.IDChiste}</p>
          <br><br><br>
        `;
        contenedorResultado.appendChild(div);
      });
      document.getElementById('puntajeChistes').value=" ";
    } else {
      contenedorResultado.innerHTML = 'No hay chistes con este puntaje';
    }
  } catch (error) {
    alert(error.message || "Ocurrió un error al obtener los chistes por puntaje");
  }
}

//Funcion para obtener chiste segun categoria seleccionada
async function obtenerChiste() {
  const tipoChiste = document.getElementById('tipoChiste').value;

  if (tipoChiste === "") {
    alert("Por favor, seleccione un tipo de chiste.");
    return;
  }

  let url = `http://localhost:3005/obtenerChiste/${tipoChiste}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('No se encontró el chiste para esta categoría');
      }
      throw new Error(`Response status: ${response.status}`);
    }
    const chisteN = await response.json();
    console.log(chisteN); 

    const contenedorResultado = document.getElementById('resultadoChiste');
<<<<<<< Updated upstream
    let chisteHtml = `<p class="texto">Chiste: ${chisteN.chiste}</p>`;
    
    if (tipoChiste === 'Propio' && chisteN.NomUser && chisteN._id) {
      chisteHtml += `
        <br><p class="texto">Nombre: ${chisteN.NomUser}</p><br>
        <br><p class="texto">ID: ${chisteN._id}</p><br>
=======
    let chisteHtml = `<p>Chiste: ${chisteN.chiste}</p>`;
    
    if (tipoChiste === 'Propio' && chisteN.NomUser && chisteN._id) {
      chisteHtml += `
        <br><p>Nombre: ${chisteN.NomUser}</p><br>
        <br><p>ID: ${chisteN._id}</p><br>
>>>>>>> Stashed changes
      `;
    }

    contenedorResultado.innerHTML = chisteHtml;
  } catch (error) {
    alert(error.message || "Ocurrió un error al obtener el chiste por categoría");
  }
}

//Funcion para obtener chiste ingresando el ID
async function obtenerChistePorId() {
  const chisteId = document.getElementById('idChiste').value;

  if (chisteId === "") {
    alert("Por favor, ingrese un ID de chiste.");
    return;
  }

  let url = `http://localhost:3005/obtenerChisteID/${chisteId}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      if (response.status === 404) {
        alert('No se ha encontrado un chiste con este ID, verifica el ID e intenta de nuevo.'); 
        return;
      }
      throw new Error(`Response status: ${response.status}`);
    }
    const chisteN = await response.json();
    
    const contenedorResultado = document.getElementById('resultadoChisteId');
    contenedorResultado.innerHTML = `
<<<<<<< Updated upstream
      <p class="texto">Chiste: ${chisteN.TxtChiste}</p>
      <p class="texto">Nombre: ${chisteN.NomUser}</p>
      <p class="texto">Puntaje: ${chisteN.Puntaje}</p>
      <p class="texto">Categoría: ${chisteN.Categoria}</p>
      <p class="texto">ID: ${chisteN._id}</p>
    `;
    document.getElementById('idChiste').value=" ";
=======
      <p>Chiste: ${chisteN.TxtChiste}</p>
      <p>Nombre: ${chisteN.NomUser}</p>
      <p>Puntaje: ${chisteN.Puntaje}</p>
      <p>Categoría: ${chisteN.Categoria}</p>
      <p>ID: ${chisteN._id}</p>
    `;
>>>>>>> Stashed changes
  } catch (error) {
    alert(error.message || "Ocurrió un error al obtener el chiste por ID");
  }
}







const btCrearP= document.getElementById("botonCrearP");
const btActualizarP= document.getElementById("botonActualizarP");
const btEliminarP= document.getElementById("botonEliminarP");
const btIDP= document.getElementById("botonIDP");
const btCantidadP= document.getElementById("botonCantidadP");
const btTodosP= document.getElementById("botonTodosP");
const btObtenerChiste= document.getElementById("botonObtenerChiste");
const btObtenerChisteID= document.getElementById("botonObtenerChisteID");



document.addEventListener('DOMContentLoaded', function() {
  showPage("Crear Chiste");  
  guardarChiste();
  efectoEncima(btCrearP,"#575454");
  efectoEncima(btActualizarP,"#575454");
  efectoEncima(btEliminarP,"#575454");
  efectoEncima(btCantidadP,"#575454");
  efectoEncima(btTodosP,"#575454");
  efectoEncima(btObtenerChiste, "#575454");
  efectoEncima(btObtenerChisteID, "#575454");

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
  btCantidadP.addEventListener("click", () => {
    efectoEncima(btCantidadP,"#575454");
    showPage("Cantidad de Chistes"); 
    obtenerCantidadChistesPorCategoria();
  });
  btTodosP.addEventListener("click", () => {
    efectoEncima(btTodosP,"#575454");
    showPage("Obtener Chistes por Puntaje"); 
    obtenerChistesPorPuntaje();
  });
  btObtenerChiste.addEventListener("click", ()=> {
    efectoEncima(btObtenerChiste,"#575454");
<<<<<<< Updated upstream
    showPage("Obtener Chiste"); 
=======
    showPage("Obtener chiste"); 
>>>>>>> Stashed changes
  });
  btObtenerChisteID.addEventListener("click", ()=> {
    efectoEncima(btObtenerChisteID,"#575454");
    showPage("Obtener Chistes por ID"); 
    document.getElementById("botonId").addEventListener("click", obtenerChistePorId);
  })  
});