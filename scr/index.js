import express from 'express'//guia para la creacion de endpoints
import cors from 'cors'//peticiones a la api
import dotenv from "dotenv"
import mongoose from 'mongoose'// interactua con la base de datos 

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
  connectDB()//llamado a la conexion de base de datos
  console.log('Api corriendo en http://localhost:3005')
})
//aqui van los endpoints que tenemos que hacer 
app.get('/hueso',async(req,res)=>{
  res.status(200).send('Hola mundo, mi primera API!')
})