const express = require('express');
const router = express.Router();
const { getEvaluation, updateEvaluation } = require('../controllers/evaluationController');

// Récupérer l'évaluation d'un employé
router.get('/:employeeName', getEvaluation);

// Mettre à jour ou créer une évaluation
router.put('/:employeeName', updateEvaluation);

module.exports = router;
