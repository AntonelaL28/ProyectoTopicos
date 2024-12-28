function showPage(page) {
  const content = document.getElementById('contenedor');
  content.innerHTML = '';

  if (page === "Crear Chiste") {
    content.innerHTML = `
      <section>
        <h2 class="Subtitulo">¡CREA TU CHISTE!</h2>
        <main class="contendorFormulario">
          <label class="texto">
            Texto del Chiste:
            <input type="text" id="txtChiste"required>
          </label>
          <label class="texto">
             Nombre del Creador:
            <input type="text" id="nomUser" required>
          </label>
          <label class="texto">
            Puntaje:
            <input type="number" id="puntaje" min="1" max="10" required>
          </label>
          <label class="texto">
            Categoría:
            <select id="categoria" required>
              <option value="Dad joke">Dad joke</option>
              <option value="Humor Negro">Humor Negro</option>
              <option value="Chistoso">Chistoso</option>
              <option value="Malo">Malo</option>
            </select>
          </label>
          <button>Crear</button>
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
            <input type="number" id="puntaje" min="1" max="10">
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



document.addEventListener('DOMContentLoaded', function() {
  showPage("Crear Chiste"); // Mostrar la página inicial por defecto
});
  

  
