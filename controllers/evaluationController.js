const Employee = require('../models/Employee');

exports.getEvaluation = async (req, res) => {
  try {
    const employeeName = decodeURIComponent(req.params.employeeName.trim());
    const employee = await Employee.findOne({ name: { $regex: `^${employeeName}$`, $options: 'i' } });

    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé." });
    }

    res.status(200).json({ evaluation: employee.evaluation });
  } catch (err) {
    console.error('Erreur lors de la récupération de l\'évaluation :', err);
    res.status(500).json({ message: "Erreur interne du serveur.", error: err.message });
  }
};

exports.updateEvaluation = async (req, res) => {
  try {
    const { totalEvaluation } = req.body;
    const employeeName = decodeURIComponent(req.params.employeeName.trim());

    console.log('Données reçues par le backend :', req.body);

    const employee = await Employee.findOne({ name: { $regex: `^${employeeName}$`, $options: 'i' } });
    console.log("emp", employee);
    if (!employee) {
      return res.status(404).json({ message: "Employé non trouvé.", employeeName });
    }

    employee.evaluation.totalEvaluation = parseFloat(totalEvaluation) || 0;

    await employee.save();

    res.status(200).json({ message: "Évaluation mise à jour avec succès.", evaluation: employee.evaluation });
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l\'évaluation :', err);
    res.status(500).json({ message: "Erreur interne du serveur.", error: err.message });
  }
};