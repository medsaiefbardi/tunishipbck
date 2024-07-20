const JobPosition = require('../models/JobPosition');
const Skill = require('../models/Skill');

exports.createJobPosition = async (req, res) => {
  try {
    const { title, ref, service, lieu, interimaire, liaisonsHiera, liaisonsFonc, raison, mission, tacheOper, tacheOccas, kpiQuant, kpiQualt, evolutionV, evolutionH, limites, objectifs, pouvoirs, requiredSkills } = req.body;
    
    const jobPosition = new JobPosition({ title, ref, service, lieu, interimaire, liaisonsHiera, liaisonsFonc, raison, mission, tacheOper, tacheOccas, kpiQuant, kpiQualt, evolutionV, evolutionH, limites, objectifs, pouvoirs, requiredSkills });

    await jobPosition.save();
    res.json(jobPosition);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getAllJobPositions = async (req, res) => {
  // console.log('getAllJobPositions called');
  try {
    const jobPositions = await JobPosition.find().populate('requiredSkills.skill');
    res.json(jobPositions);
  } catch (err) {
    console.error('Error fetching job positions:', err);
    res.status(500).send('Server error');
  }
};

exports.updateJobPosition = async (req, res) => {
  try {
    const updatedJobPosition = await JobPosition.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJobPosition);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteJobPosition = async (req, res) => {
  try {
    await JobPosition.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Job Position deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};