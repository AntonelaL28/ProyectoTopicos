import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chisteSchema = new Schema({
  TxtChiste: {
    type: String,
    required: true
  },
  NomUser: {
    type: String,
    required: true
  },
  Puntaje: {
    type: Number,
    required: true
  },
  Categoria: {
    type: String,
    required: true,
    enum: ['Dad joke', 'Humor Negro', 'Chistoso', 'Malo']
  },
  IDChiste: {
    type: String,
    required: true
  }
});

const Chiste = mongoose.model('Chiste', chisteSchema);
export{Chiste}
