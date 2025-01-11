const mongoose = require('mongoose');

const EvaluationResultSchema = new mongoose.Schema({
  employeeName: { type: String, required: true }, // Utilisation du nom de l'employé
  totalPerformance: { type: Number, required: true },
  totalCompetence: { type: Number, required: true },
  evaluationResult: { type: Number, required: true },
});

module.exports = mongoose.model('EvaluationResult', EvaluationResultSchema);
