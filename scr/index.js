import express from 'express';
import cors from 'cors';
<<<<<<< Updated upstream
import dotenv from "dotenv";
import mongoose from 'mongoose';
import {Chiste} from './chistes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
import { swaggerUi, swaggerDocs } from './swagger.js'; // Importa Swagger
=======
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


>>>>>>> Stashed changes

const app = express();
dotenv.config();

<<<<<<< Updated upstream
const port = 3005;
=======
//IMPORTANTE cada cambio se tiene que bajar y volver a subir su servidor 
const port= 3005
app.use(cors({origin:'*'}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:false}))
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
>>>>>>> Stashed changes

// Middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));

// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directorio base para los archivos estáticos
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

<<<<<<< Updated upstream
// Conexión a la base de datos
const connectDB = () => {
  const {
    MONGO_USERNAME, // Variables de entorno para la desestructuración de objetos
=======
const specs = swaggerJSDoc(options)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))

//conexion a la base de datos
const connectDB= ()=>{
  const{
    MONGO_USERNAME,//son las variables de entorno, para la desetructuracion de objetos
>>>>>>> Stashed changes
    MONGO_PASSWORD,
    MONGO_PORT,
    MONGO_DB,
    MONGO_HOSTNAME
  } = process.env;

  const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
  mongoose.connect(url).then(() => {
    console.log("Mongo está corriendo");
  }).catch((err) => {
    console.log(err);
  });
};

<<<<<<< Updated upstream
app.listen(port, () => {
  connectDB();
  console.log('API corriendo en http://localhost:3005');
});

// Ruta para la raíz
=======
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
 *     summary: Crear un nuevo chiste
 *     tags: [Chistes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - TxtChiste
 *               - NomUser
 *               - Puntaje
 *               - Categoria
 *             properties:
 *               TxtChiste:
 *                 type: string
 *                 description: El texto del chiste
 *               NomUser:
 *                 type: string
 *                 description: Nombre del usuario que crea el chiste
 *               Puntaje:
 *                 type: integer
 *                 description: Puntaje del chiste
 *               Categoria:
 *                 type: string
 *                 description: Categoría del chiste
 *     responses:
 *       200:
 *         description: El chiste se ha creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Chiste creado exitosamente"
 *       400:
 *         description: Error en la solicitud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al crear el chiste"
 *       500:
 *         description: Error en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al guardar el chiste"
 */



//ruta para la raíz
>>>>>>> Stashed changes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


//aqui van los endpoints que tenemos que hacer 

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

app.get('/chiste/:id', async (req, res) => {
  try {
    const chisteEncontrado = await Chiste.findById(req.params.id)
    res.status(200).send(chisteEncontrado)
  } catch (error) {
    res.status(400).send('Error al buscar el chiste.')
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
 *             required:
 *               - TxtChiste
 *               - NomUser
 *               - Puntaje
 *               - Categoria
 *             properties:
 *               TxtChiste:
 *                 type: string
 *                 description: El nuevo texto del chiste
 *               NomUser:
 *                 type: string
 *                 description: El nuevo nombre del usuario
 *               Puntaje:
 *                 type: integer
 *                 description: El nuevo puntaje del chiste
 *               Categoria:
 *                 type: string
 *                 description: La nueva categoría del chiste
 *     responses:
 *       200:
 *         description: El chiste se actualizó correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: ID del chiste actualizado
 *                 TxtChiste:
 *                   type: string
 *                   description: El texto actualizado del chiste
 *                 NomUser:
 *                   type: string
 *                   description: El nombre actualizado del usuario
 *                 Puntaje:
 *                   type: integer
 *                   description: El puntaje actualizado del chiste
 *                 Categoria:
 *                   type: string
 *                   description: La categoría actualizada del chiste
 *       400:
 *         description: Error al actualizar el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al buscar el chiste."
 *       404:
 *         description: Chiste no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Chiste no encontrado."
 */


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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al eliminar el chiste."
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
 *     responses:
 *       200:
 *         description: La cantidad de chistes en la categoría especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categoria:
 *                   type: string
 *                   description: La categoría de los chistes
 *                 cantidad:
 *                   type: integer
 *                   description: El número de chistes en la categoría
 *       404:
 *         description: No hay chistes en la categoría especificada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No hay chistes en esta categoría."
 *       400:
 *         description: Error al obtener la cantidad de chistes por categoría
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener la cantidad de chistes por categoría."
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
 *     responses:
 *       200:
 *         description: Chistes encontrados con el puntaje especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   TxtChiste:
 *                     type: string
 *                     description: El texto del chiste
 *                   NomUser:
 *                     type: string
 *                     description: Nombre del usuario que creó el chiste
 *                   Puntaje:
 *                     type: integer
 *                     description: Puntaje del chiste
 *                   Categoria:
 *                     type: string
 *                     description: Categoría del chiste
 *                   _id:
 *                     type: string
 *                     description: ID del chiste
 *       404:
 *         description: No se encontraron chistes con el puntaje especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No hay chistes con este puntaje."
 *       400:
 *         description: Error al obtener los chistes por puntaje
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener los chistes por puntaje."
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
 *         description: Chiste obtenido con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chiste:
 *                   type: string
 *                   description: El texto del chiste obtenido
 *                 NomUser:
 *                   type: string
 *                   description: Nombre del usuario que creó el chiste (solo si el tipo es 'Propio')
 *                 _id:
 *                   type: string
 *                   description: ID del chiste (solo si el tipo es 'Propio')
 *       400:
 *         description: Error si el tipo es inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Este tipo es inválido. Por favor seleccione uno válido."
 *       500:
 *         description: Error al obtener el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al obtener el chiste"
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

<<<<<<< Updated upstream
=======

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
 *         description: Chiste encontrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   description: El ID del chiste
 *                 TxtChiste:
 *                   type: string
 *                   description: El texto del chiste
 *                 NomUser:
 *                   type: string
 *                   description: Nombre del usuario que creó el chiste
 *                 Puntaje:
 *                   type: integer
 *                   description: Puntaje del chiste
 *                 Categoria:
 *                   type: string
 *                   description: Categoría del chiste
 *       404:
 *         description: Chiste no encontrado o ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Chiste no encontrado."
 *       500:
 *         description: Error al buscar el chiste
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al buscar el chiste."
 */

>>>>>>> Stashed changes
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


