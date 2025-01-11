const Employee = require('../models/Employee');

exports.getEvaluation = async (req, res) => {
    try {
      const employeeName = req.params.employeeName;
      const employee = await Employee.findOne({ name: employeeName });
  
      if (!employee) {
        return res.status(404).json({ message: "Employé non trouvé." });
      }
  
      res.status(200).json({ evaluation: employee.evaluation });
    } catch (err) {
      console.error('Erreur lors de la récupération de l\'évaluation :', err);
      res.status(500).json({ message: "Erreur interne du serveur.", error: err.message });
    }
  };
  // Met à jour ou crée une évaluation pour un employé
  exports.updateEvaluation = async (req, res) => {
    try {
      const { objectivesPerformance, objectivesCompetence, totalPerformance, totalCompetence, totalEvaluation } = req.body;
      const employeeName = req.params.employeeName;
  
      console.log('Données reçues par le backend :', req.body);
  
      const employee = await Employee.findOne({ name: employeeName });
      if (!employee) {
        return res.status(404).json({ message: "Employé non trouvé." });
      }
  
      // Mise à jour des évaluations
      employee.evaluation = {
        objectivesPerformance,
        objectivesCompetence,
        totalPerformance: parseFloat(totalPerformance) || 0,
        totalCompetence: parseFloat(totalCompetence) || 0,
        totalEvaluation: parseFloat(totalEvaluation) || 0,
      };
  
      await employee.save();
  
      res.status(200).json({ message: "Évaluation mise à jour avec succès.", evaluation: employee.evaluation });
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l\'évaluation :', err);
      res.status(500).json({ message: "Erreur interne du serveur.", error: err.message });
    }
  };
  