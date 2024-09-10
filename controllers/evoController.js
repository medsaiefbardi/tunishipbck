const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee');
const JobPosition = require('../models/JobPosition');

// Calculate evolution for a selected employee
router.get('/employee/:id/evolution', async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('skills.skill jobPosition');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const jobPosition = employee.jobPosition;

    // Calculate evolution for KPIs
    let kpiEvolution = 0;
    jobPosition.kpiQuant.forEach((kpi, idx) => {
      // Use the employee's evolutionKpi to calculate total KPI evolution
      kpiEvolution += employee.evolutionKpi[idx] || 0;
    });

    // Calculate evolution for Competencies
    let competenceEvolution = 0;
    employee.skills.forEach((skill, idx) => {
      competenceEvolution += employee.evolutionCompetence[idx] || 0;
    });

    // Return evolution data
    res.json({
      kpiEvolution,
      competenceEvolution,
      totalEvolution: kpiEvolution + competenceEvolution
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
