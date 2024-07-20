const Employee = require('../models/Employee');
const bcrypt = require('bcryptjs'); // Ensure bcrypt is required at the top
exports.getProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.employeeId).populate('jobPosition').populate('skills.skill');
    if (!employee) {
      return res.status(404).json({ msg: 'Employee not found' });
    }

    res.json({
      employee,
      jobPosition: employee.jobPosition,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().populate('jobPosition').populate('skills.skill');
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate('jobPosition').populate('skills.skill');
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, password, role, jobPosition, skills } = req.body;
    
    // Check if the employee already exists
    const existingEmployee = await Employee.findOne({ name });
    if (existingEmployee) {
      return res.status(400).json({ msg: 'Employee already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new employee with hashed password
    const newEmployee = new Employee({ name, password: hashedPassword, role, jobPosition, skills });
    await newEmployee.save();
    res.json(newEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, role, jobPosition, skills } = req.body;
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      {
        name,
        role,
        jobPosition,
        skills: skills.map(skill => ({
          skill: skill.skill._id || skill.skill,
          level: skill.level
        }))
      },
      { new: true }
    ).populate('jobPosition').populate('skills.skill');

    res.json(updatedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Employee deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.addSkillToEmployee = async (req, res) => {
  const { skillId, level } = req.body;
  try {
    const employee = await Employee.findById(req.params.id);
    employee.skills.push({ skill: skillId, level });
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.removeSkillFromEmployee = async (req, res) => {
  const { skillId } = req.body;
  try {
    const employee = await Employee.findById(req.params.id);
    employee.skills = employee.skills.filter(skill => skill.skill.toString() !== skillId);
    await employee.save();
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

exports.updateSkillLevel = async (req, res) => {
  const { level } = req.body;
  try {
    const employee = await Employee.findById(req.params.employeeId);
    const skill = employee.skills.find(s => s.skill.toString() === req.params.skillId);
    if (skill) {
      skill.level = level;
      await employee.save();
      res.json(employee);
    } else {
      res.status(404).json({ msg: 'Skill not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
