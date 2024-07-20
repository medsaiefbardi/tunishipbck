const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const skillSchema = new Schema({
  libelle: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  type: { 
    type: String, 
    enum: [
      'connaissance', 
      'savoir faire', 
      'savoir etre', 
      'mvv', 
      'tuniship qhse', 
      'competence bureautique', 
      'competence linguistique'
    ], 
    required: true 
  },
  level: { 
    type: String, 
    enum: ['N/A','N', 'A', 'M', 'E'], 
    required: true,
    default: 'N/A'

  },
  definition: String,
  notion: String,
  application: String,
  maitrise: String,
  expertise: String
});

module.exports = mongoose.model('Skill', skillSchema);
