const Skill = require('../models/Skill');
const Employee = require('../models/Employee');
const JobPosition = require('../models/JobPosition');

exports.createSkill = async (req, res) => {
  try {
    const { libelle, code, type, level, definition, notion, application, maitrise, expertise } = req.body;

    const skill = new Skill({ libelle, code, type, level, definition, notion, application, maitrise, expertise });
    await skill.save();

    // Add new skill to all employees with default level 'N'
    const employees = await Employee.find();
    for (const employee of employees) {
      employee.skills.push({ skill: skill._id, level: 'N/A'});
      await employee.save();
    }

    res.json(skill);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    res.json(skills);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedSkill);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    await Skill.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Skill deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
