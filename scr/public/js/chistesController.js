
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
            <input type="text" id="nomUserC" required>
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
          <label class="texto">
            ID del Chiste:
            <input type="text" id="IDChiste">
          </label>
          <label class="texto">
            Texto del Chiste:
            <input type="text" id="txtChiste">
          </label>
          <label class="texto">
             Nombre del Creador:
            <input type="text" id="nomUser">
          </label>
          <label class="texto">
            Puntaje:
            <select id="puntajeA" required>
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
            <select id="categoria">
              <option value="Dad joke">Dad joke</option>
              <option value="Humor Negro">Humor Negro</option>
              <option value="Chistoso">Chistoso</option>
              <option value="Malo">Malo</option>
            </select>
          </label>
          <button>Actualizar</button>
        </main>
      </section>
    `;
  }
  if (page === "Eliminar Chiste") {
    content.innerHTML = `
      <section class="contendorID">
        <h2 class="Subtitulo">¡ELIMINA TUS CHISTES!</h2>
        <p class="texto">Indica el ID del chiste que quieres eliminar.</p>
        <input type="text" id="txtChiste">
        <button>Eliminar</button>
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
  const btCrear= document.getElementById("botonCrear");
  btCrear.addEventListener("click", async () => {
    efectoEncima(btCrear,"#575454","#7c7b7b");
    try { 
      const ID = await crearChiste();
      console.log("se imprimio bien, este es el id:", ID);
      const contenedorMensaje = document.getElementById("mensajeId");
      contenedorMensaje.innerHTML = '';
      contenedorMensaje.innerHTML = `
        <h3 class="Subtitulo">Este es el ID de tu chiste: ${ID}</h3>
      `;
    } catch (error) { 
      console.error('Error al hacer el chiste:', error);
    }
  });
}












document.addEventListener('DOMContentLoaded', function() {
  showPage("Crear Chiste");
 
   
  guardarChiste();
});




