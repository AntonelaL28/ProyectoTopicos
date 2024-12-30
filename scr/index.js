import express from 'express'
import cors from 'cors'
import dotenv from "dotenv"
import mongoose from 'mongoose'
import {Chiste} from './chistes.js'
const app= express()
dotenv.config()

//IMPORTANTE cada cambio se tiene que baja y volver a subir su servidor 
const port= 3005
app.use(cors({origin:'*'}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended:false}))

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
    res.status(400).send('Erro al crear el chiste.')
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



