import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import {Chiste} from './chistes.js'
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';

const app= express()
dotenv.config()

//IMPORTANTE cada cambio se tiene que bajar y volver a subir su servidor 
const port= 3005
app.use(cors({origin:'*'}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:false}))

//obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//directorio base para los archivos estáticos
const staticPath = path.join(__dirname, 'public');
app.use(express.static(staticPath));

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

app.delete('/eliminarChiste/:id', async (req, res) => {
  try {
    const chisteEliminar = await Chiste.deleteOne({ _id: req.params.id });
    res.status(200).send('Se eliminó el chiste exitosamente.');
  } catch (error) {
    res.status(400).send('Error al eliminar el chiste.');
  }
});

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
        return res.status(200).json({ chiste: chisteAleatorio.TxtChiste });
      }
    } else {
      return res.status(400).json({ error: 'Este tipo es inválido. Por favor seleccione uno válido.' });
    }
  } catch (err) {
    console.error('Error al obtener el chiste:', err); 
    return res.status(500).send('Error al obtener el chiste');
  }
});