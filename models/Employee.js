const mongoose = require('mongoose');

const employeeSkillSchema = new mongoose.Schema({
  skill: { type: mongoose.Schema.Types.ObjectId, ref: 'Skill', required: true },
  level: { type: String, enum: ['N/A','N', 'A', 'M', 'E'], default: 'N/A' }
});

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['employee', 'hr_head'], required: true },
  jobPosition: { type: mongoose.Schema.Types.ObjectId, ref: 'JobPosition' },
  skills: [employeeSkillSchema]
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
