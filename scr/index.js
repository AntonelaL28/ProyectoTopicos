import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Chiste } from './chistes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import swaggerUi from 'swagger-ui-express';
import swaggerDocs from './swagger-config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import options from './swagger-config.js';



const app= express()
dotenv.config()

//IMPORTANTE cada cambio se tiene que bajar y volver a subir su servidor 
const port= 3005
app.use(cors({origin:'*'}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:false}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));//http://localhost:3005/api-docs

//obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//directorio base para los archivos estáticos
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

//conexion a la base de datos
const connectDB= ()=>{
  const{
    MONGO_USERNAME,//son las variables de entorno, para la desetructuracion de objetos
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB,
    MONGO_HOSTNAME
  }= process.env

  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
  mongoose.connect(url).then( ()=>{
    console.log("Mongo esta corriendo")
  }).catch((err)=>{
    console.log(err)
  })
}
app.listen(port, ()=>{
  connectDB()
  console.log('Api corriendo en http://localhost:3005')
})

//ruta para la raíz
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});



//aqui van los endpoints que tenemos que hacer 

/**
 * @swagger
 * tags:
 *    name: Chistes
 *    description: API endpoint para gestionar chistes
 */

/**
 * @swagger
 * /crearChiste:
 *   post:
 *     summary: Crea un nuevo chiste
 *     tags: [Chistes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               oneOf:
 *                 - type: string
 *                   description: Texto del chiste
 *                   example: "¿Por qué las focas miran siempre hacia arriba? ¡Porque ahí están los focos!"
 *                 - type: string
 *                   description: Nombre del usuario
 *                   example: "Juan Pérez"
 *                 - type: integer
 *                   description: Puntaje del chiste
 *                   minimum: 1
 *                   maximum: 10
 *                   example: 5
 *                 - type: string
 *                   description: Categoría del chiste
 *                   enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']
 *                   example: "Humor Negro"
 *                 - type: string
 *                   description: ID del chiste
 *                   example: " "
 *     responses:
 *       200:
 *         description: Chiste creado.
 *       400:
 *         description: Error al crear el chiste.
 */
app.post('/crearChiste', async(req,res)=>{
  try{
    var data = req.body 
    var newChiste = new Chiste({ 
      TxtChiste: data[0], 
      NomUser: data[1], 
      Puntaje: data[2], 
      Categoria: data[3],
      IDChiste:data[4]
    })
    console.log('Datos recibidos:', data);
    const guardarChiste = await newChiste.save(); 
    guardarChiste.IDChiste = guardarChiste._id.toString(); 
    await guardarChiste.save();
    res.status(200).json({ message: 'Se creó el chiste exitosamente.', id: guardarChiste._id})
  }catch(err){
    res.status(400).send('Error al crear el chiste.')
  }
})

/**
 * @swagger
 * /actualizarChiste/{id}:
 *   put:
 *     summary: Actualizar un chiste por su ID
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del chiste a actualizar
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               TxtChiste:
 *                 type: string
 *                 description: Texto del chiste
 *                 example: "¿Por qué las focas miran siempre hacia arriba? ¡Porque ahí están los focos!"
 *               NomUser:
 *                 type: string
 *                 description: Nombre del usuario
 *                 example: "Juan Pérez"
 *               Puntaje:
 *                 type: integer
 *                 description: Puntaje del chiste
 *                 minimum: 1
 *                 maximum: 10
 *                 example: 5
 *               Categoria:
 *                 type: string
 *                 description: Categoría del chiste
 *                 enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']
 *                 example: "Humor Negro"
 *               IDChiste:
 *                 type: string
 *                 description: ID del chiste
 *                 example: "12345"
 *     responses:
 *       200:
 *         description: El chiste se actualizó correctamente.   
 *       400:
 *         description: Error al actualizar el chiste.
 */
app.get('/chiste/:id', async (req, res) => {
  try {
    const chisteEncontrado = await Chiste.findById(req.params.id)
    res.status(200).send(chisteEncontrado)
  } catch (error) {
    res.status(400).send('Error al buscar el chiste.')
  }
})

app.put('/actualizarChiste/:id', async (req, res) => {
  try {
    var data = req.body 
    const chisteEncontrado = await Chiste.findById(req.params.id)
    
    chisteEncontrado.TxtChiste = data.TxtChiste; 
    chisteEncontrado.NomUser = data.NomUser; 
    chisteEncontrado.Puntaje = data.Puntaje; 
    chisteEncontrado.Categoria = data.Categoria; 
    await chisteEncontrado.save();
    
    res.status(200).send(chisteEncontrado)
  } catch (error) {
    res.status(400).send('Error al buscar el chiste.')
  }
})

/**
 * @swagger
 * /eliminarChiste/{id}:
 *   delete:
 *     summary: Eliminar un chiste por su ID
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del chiste a eliminar
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: El chiste se eliminó exitosamente
 *       400:
 *         description: Error al eliminar el chiste
 */

app.delete('/eliminarChiste/:id', async (req, res) => {
  try {
    const chisteEliminar = await Chiste.deleteOne({ _id: req.params.id });
    res.status(200).send('Se eliminó el chiste exitosamente.');
  } catch (error) {
    res.status(400).send('Error al eliminar el chiste.');
  }
});

/**
 * @swagger
 * /cantidadChistes/{categoria}:
 *   get:
 *     summary: Obtener la cantidad de chistes en una categoría específica
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: categoria
 *         required: true
 *         description: La categoría de los chistes
 *         schema:
 *           type: string
 *           enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']
 *     responses:
 *       200:
 *         description: La cantidad de chistes en la categoría especificada.
 *       400:
 *         description: Error al obtener la cantidad de chistes por categoría.
 */

app.get('/cantidadChistes/:categoria', async (req, res) => {
  try {
    const categoria = req.params.categoria;
    const cantidadChistes = await Chiste.countDocuments({ Categoria: categoria });
    if (cantidadChistes === 0) {
      return res.status(404).send({ error: 'No hay chistes en esta categoría.' });
    }
    res.status(200).send({ categoria: categoria, cantidad: cantidadChistes });
  } catch (error) {
    res.status(400).send({ error: 'Error al obtener la cantidad de chistes por categoría.' });
  }
});

/**
 * @swagger
 * /chistesPuntaje/{puntaje}:
 *   get:
 *     summary: Obtener chistes filtrados por puntaje
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: puntaje
 *         required: true
 *         description: El puntaje por el cual se desean obtener los chistes
 *         schema:
 *           type: integer
 *           enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 *     responses:
 *       200:
 *         description: Chistes encontrados con el puntaje especificado.
 *       400:
 *         description: Error al obtener los chistes por puntaje.
 */

app.get('/chistesPuntaje/:puntaje', async (req, res) => {
  try {
    const puntaje = parseInt(req.params.puntaje);
    const chistesPorPuntaje = await Chiste.find({ Puntaje: puntaje });
    if (chistesPorPuntaje.length === 0) {
      return res.status(404).send({ error: 'No hay chistes con este puntaje.' });
    }
    res.status(200).send(chistesPorPuntaje);
  } catch (error) {
    res.status(400).send({ error: 'Error al obtener los chistes por puntaje.' });
  }
});

/**
 * @swagger
 * /obtenerChiste/{tipo}:
 *   get:
 *     summary: Obtener un chiste aleatorio basado en el tipo
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: tipo
 *         required: true
 *         description: El tipo de chiste que se quiere obtener. Puede ser 'Chuck', 'Dad' o 'Propio'.
 *         schema:
 *           type: string
 *           enum: [Chuck, Dad, Propio]
 *     responses:
 *       200:
 *         description: Chiste obtenido con éxito.
 *       400:
 *         description: Error si el tipo es inválido.
 *       500:
 *         description: Error al obtener el chiste.
 */

app.get('/obtenerChiste/:tipo', async (req, res) => {
  const { tipo } = req.params;
  try {
    if (tipo === 'Chuck') {
      const response = await axios.get('https://api.chucknorris.io/jokes/random');
      return res.status(200).json({ chiste: response.data.value });
    } else if (tipo === 'Dad') {
      const response = await axios.get('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'application/json' }
      });
      return res.status(200).json({ chiste: response.data.joke });
    } else if (tipo === 'Propio') {
      const chistesPropios = await Chiste.find({});
      if (chistesPropios.length === 0) {
        return res.status(200).json({ chiste: "Aún no hay chistes. ¡Crea uno!" });
      } else {
        const chisteAleatorio = chistesPropios[Math.floor(Math.random() * chistesPropios.length)];
        return res.status(200).json({ 
          chiste: chisteAleatorio.TxtChiste, 
          NomUser: chisteAleatorio.NomUser, 
          _id: chisteAleatorio._id 
        });
      }
    } else {
      return res.status(400).json({ error: 'Este tipo es inválido. Por favor seleccione uno válido.' });
    }
  } catch (err) {
    console.error('Error al obtener el chiste:', err); 
    return res.status(500).send('Error al obtener el chiste');
  }
});

/**
 * @swagger
 * /obtenerChisteID/{id}:
 *   get:
 *     summary: Obtener un chiste específico por ID
 *     tags: [Chistes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: El ID del chiste a obtener.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chiste encontrado con éxito.
 *       404:
 *         description: Chiste no encontrado o ID inválido.
 *       500:
 *         description: Error al buscar el chiste.
 */

app.get('/obtenerChisteID/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const chiste = await Chiste.findById(id);
    if (!chiste) {
      return res.status(404).json({ error: 'Chiste no encontrado.' });
    }
    return res.status(200).json(chiste);
  } catch (error) {
    if (error.name === 'CastError' && error.kind === 'ObjectId') {
      return res.status(404).json({ error: 'Chiste no encontrado.' });
    }
    return res.status(500).send('Error al buscar el chiste.');
  }
});


