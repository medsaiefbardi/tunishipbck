const mongoose = require('mongoose');

const missionSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String }
});

const tschema = new mongoose.Schema({
  titre :{type: String},
  int: { type: String },
  moyOut: { type: String }
});

const jobPositionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  ref: { type: String, required: true },
  service: { type: String, required: true },
  lieu: { type: String, required: true },
  interimaire: { type: String, required: true },
  liaisonsHiera: { type: String, required: true },
  liaisonsFonc: { type: String, required: true },
  raison: { type: String, required: true },
  mission: [missionSchema],
  tacheOper: [missionSchema],
  tacheOccas: [missionSchema],
  tachesStrat: [missionSchema],
  tachesEP: [tschema],
  kpiQuant: { type: String, required: true },
  kpiQualt: { type: String, required: true },
  evolutionV: { type: String, required: true },
  evolutionH: { type: String, required: true },
  limites: { type: [String], required: true }, // Changed to array of strings
  objectifs:[missionSchema], // Changed to array of strings
  pouvoirs: { type: [String], required: true }, // Changed to array of strings
  requiredSkills: [{
    skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
    level: { type: String, enum: ['N/A','N', 'A', 'M', 'E'], required: true }
  }]
});

const JobPosition = mongoose.model('JobPosition', jobPositionSchema);

module.exports = JobPosition;
