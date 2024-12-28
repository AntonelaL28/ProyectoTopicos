import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chisteSchema = new Schema({
  // En este caso no es necesario tener un id como atributo porque esta base de dato ya lo hace
  TxtChiste: {
    type: String,
    required: true // esto es para indicar que el dato es necesario que se indique 
  },
  NomUser: {
    type: String,
    required: true
  },
  Puntaje: {
    type: Number,
    required: true, 
  },
  Categoria: {
    type: String,
    required: true, 
    enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']
  }
});

const Chiste = mongoose.model('Chiste', chisteSchema);
export default Chiste;
