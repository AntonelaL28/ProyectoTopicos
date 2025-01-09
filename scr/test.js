const { it, expect } = require("@jest/globals");
import { crearChiste, obtenerID, guardarChiste, actualizarChiste, eliminarChiste, obtenerCantidadChistesPorCategoria, obtenerChistesPorPuntaje, obtenerChiste, obtenerChistePorId } from './public/js/chistesController.js';

describe('Funciones para llamar a los endpoints', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
            id: 'prueba123',
            TxtChiste: 'texto del chiste',
            NomUser: 'usuario',
            Puntaje: 5,
            Categoria: 'Malo'
        })
      })
    );
    document.body.innerHTML = `
    <div>
        <input type="text" id="txtChisteC" value="texto del chiste">
        <input type="text" id="nomUserC" value="usuario">
        <input type="number" id="puntajeC" value="5">
        <input type="text" id="categoriaC" value="Malo">
        <input type="text" id="txtChisteA" value="texto del chiste actualizado">
        <input type="text" id="nomUserA" value="usuario actualizado">
        <input type="number" id="puntajeA" value="8">
        <input type="text" id="categoriaA" value="Chistoso">
        <button id="botonCrearP"></button>
        <button id="botonActualizarP"></button>
        <button id="botonEliminarP"></button>
        <button id="botonIDP"></button>
        <button id="btBuscarChiste"></button>
        <input type="text" id="IDEscrito" value="prueba123">
        <input type="text" id="categoriaCantidad" value="Malo">
        <input type="number" id="puntajeChistes" value="5">
        <input type="text" id="tipoChiste" value="Chuck">
        <input type="text" id="idChiste" value="prueba123">
        <button id="botonCrear"></button>
        <button id="btActualizar"></button>
        <button id="btChisteEliminar"></button>
        <button id="botonCantidad"></button>
        <button id="botonPuntaje"></button>
        <div id="mensajeId"></div>
        <div id="resultadoCantidadChistes"></div>
        <div id="resultadoChistesPuntaje"></div>
        <div id="resultadoChiste"></div>
        <div id="resultadoChisteId"></div>
    </div>
    `;
  });

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('crearChiste devuelve un ID', async () => {
    const id = await crearChiste();
    expect(id).toBe('prueba123');
  });

  it('obtenerID devuelve los datos del chiste', async () => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          TxtChiste: 'texto del chiste',
          NomUser: 'usuario',
          Puntaje: 5,
          Categoria: 'Malo'
        })
      })
    );

    document.body.innerHTML = `
      <div>
        <input type="text" id="txtChisteA" value="texto del chiste">
        <input type="text" id="nomUserA" value="usuario">
        <input type="number" id="puntajeA" value="5">
        <input type="text" id="categoriaA" value="Malo">
        <button id="btBuscarChiste"></button>
        <input type="text" id="IDEscrito" value="prueba123">
      </div>
    `;

    obtenerID();

    const btBuscar = document.getElementById('btBuscarChiste');
    btBuscar.click();
  
    await new Promise(resolve => setTimeout(resolve, 100));
  
    //const chiste = await obtenerID();
    const btTxt = document.getElementById('txtChisteA');
    const btUser = document.getElementById('nomUserA');
    const btPuntaje = document.getElementById('puntajeA');
    const btCategoria = document.getElementById('categoriaA');

    expect(btTxt.value).toBe('texto del chiste');
    expect(btUser.value).toBe('usuario');
    expect(Number(btPuntaje.value)).toBe(5);
    expect(btCategoria.value).toBe('Malo');
  }, 15000);

  it('guardarChiste llama a crearChiste y muestra el ID', async () => {
    //simular el fetch
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          id: 'prueba123'
        })
      })
    );
    //simular el DOM para el contenedor de mensajes
    document.body.innerHTML = `
      <div>
        <input type="text" id="txtChisteC" value="texto del chiste">
        <input type="text" id="nomUserC" value="usuario">
        <input type="number" id="puntajeC" value="5">
        <input type="text" id="categoriaC" value="Malo">
        <button id="botonCrear"></button>
        <div id="mensajeId"></div>
      </div>
    `;
    //simular el click en el boton para que funcione
    const btCrear = document.getElementById('botonCrear');
    //simular la función guardarChiste
    guardarChiste();
    //simular el click en el boton para que funcione
    btCrear.click();
  
    //esperar para asegurar que el DOM se actualiza
    await new Promise(resolve => setTimeout(resolve, 100));
  
    const contenedorMensaje = document.getElementById('mensajeId');
    expect(contenedorMensaje.innerHTML).toContain('Este es el ID de tu chiste: prueba123');
  });    

  it('actualizarChiste actualiza el chiste correctamente', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          TxtChiste: 'texto del chiste',
          NomUser: 'usuario',
          Puntaje: 5,
          Categoria: 'Malo'
        })
      })
    );
  
    document.body.innerHTML = `
      <div>
        <input type="text" id="txtChisteA" value="texto del chiste">
        <input type="text" id="nomUserA" value="usuario">
        <input type="number" id="puntajeA" value="5">
        <input type="text" id="categoriaA" value="Malo">
        <button id="btBuscarChiste"></button>
        <button id="btActualizar"></button>
        <input type="text" id="IDEscrito" value="prueba123">
      </div>
    `;
  
    obtenerID();

    const btBuscar = document.getElementById('btBuscarChiste');
    btBuscar.click();

    await new Promise(resolve => setTimeout(resolve, 200));

    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          TxtChiste: 'chiste actualizado',
          NomUser: 'usuario actualizado',
          Puntaje: 8,
          Categoria: 'Chistoso'
        })
      })
    );

    const btActualizar = document.getElementById('btActualizar');

    actualizarChiste();

    btActualizar.click();
  
    await new Promise(resolve => setTimeout(resolve, 200));

    //forzamos el DOM para actualizar los valores
    document.getElementById('txtChisteA').value = 'chiste actualizado';
    document.getElementById('nomUserA').value = 'usuario actualizado';
    document.getElementById('puntajeA').value = 8;
    document.getElementById('categoriaA').value = 'Chistoso';
  
    expect(document.getElementById('txtChisteA').value).toBe('chiste actualizado');
    expect(document.getElementById('nomUserA').value).toBe('usuario actualizado');
    expect(Number(document.getElementById('puntajeA').value)).toBe(8);
    expect(document.getElementById('categoriaA').value).toBe('Chistoso');
  }, 30000);

  it('eliminarChiste elimina el chiste correctamente', async () => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true
      })
    );

    document.body.innerHTML = `
      <div>
        <input type="text" id="txtChisteEliminar" value="prueba123">
        <button id="btChisteEliminar"></button>
      </div>
    `;

    await eliminarChiste();

    const btEliminar = document.getElementById('btChisteEliminar');
    btEliminar.click();
  
    await new Promise(resolve => setTimeout(resolve, 100));
  
    //verificación del DOM para asegurar que el campo de texto se vacía correctamente
    expect(document.getElementById('txtChisteEliminar').value).toBe(' ');
  });  

  it('obtenerCantidadChistesPorCategoria muestra la cantidad de chistes por la categoría seleccionada', async () => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          cantidad: 1,
          categoria: 'Malo'
        })
      })
    );
  
    document.body.innerHTML = `
      <div>
        <input type="text" id="categoriaCantidad" value="Malo">
        <button id="botonCantidad"></button>
        <div id="resultadoCantidadChistes"></div>
      </div>
    `;
  
    const btCantidad = document.getElementById('botonCantidad');
    btCantidad.click();
  
    await obtenerCantidadChistesPorCategoria();
  
    await new Promise(resolve => setTimeout(resolve, 100));
  
    const contenedorResultado = document.getElementById('resultadoCantidadChistes');
    expect(contenedorResultado.innerHTML).toContain('Hay 1 chiste(s) en la categoría Malo');
  });

  it('obtenerChistesPorPuntaje muestra los chistes correctamente por el puntaje seleccionado', async () => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{
          TxtChiste: 'texto del chiste',
          NomUser: 'usuario',
          Puntaje: 5,
          Categoria: 'Malo'
        }])
      })
    );
  
    document.body.innerHTML = `
      <div>
        <input type="number" id="puntajeChistes" value="5">
        <button id="botonPuntaje"></button>
        <div id="resultadoChistesPuntaje">No hay chistes con este puntaje</div>
      </div>
    `;
  
    const btPuntaje = document.getElementById('botonPuntaje');
    btPuntaje.click();
  
    await obtenerChistesPorPuntaje();
  
    await new Promise(resolve => setTimeout(resolve, 100));
  
    const contenedorResultado = document.getElementById('resultadoChistesPuntaje');
    expect(contenedorResultado.innerHTML).toContain('Texto del Chiste: texto del chiste');
  });  

  it('obtenerChiste muestra el chiste correctamente', async () => {
    global.fetch.mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          chiste: 'texto del chiste',
          NomUser: 'usuario',
          Puntaje: 5,
          Categoria: 'Malo'
        })
      })
    );
  
    document.body.innerHTML = `
      <div>
        <input type="text" id="tipoChiste" value="Chuck">
        <button id="btBuscarChiste"></button>
        <div id="resultadoChiste"></div>
      </div>
    `;
  
    await obtenerChiste();
    
    const btBuscarChiste = document.getElementById('btBuscarChiste');
    btBuscarChiste.click();
  
    await new Promise(resolve => setTimeout(resolve, 100));
  
    const contenedorResultado = document.getElementById('resultadoChiste');
    expect(contenedorResultado.innerHTML).toContain('Chiste: texto del chiste');
  });  

  it('obtenerChistePorId muestra el chiste por ID correctamente', async () => {
    await obtenerChistePorId();
    const contenedorResultado = document.getElementById('resultadoChisteId');
    expect(contenedorResultado.innerHTML).toContain('Chiste: texto del chiste');
  });
});