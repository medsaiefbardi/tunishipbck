const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

exports.register = async (req, res) => {
  const { name, password, role, jobPosition } = req.body;
  try {
    const existingEmployee = await Employee.findOne({ name });
    if (existingEmployee) {
      return res.status(400).json({ msg: 'Employee already exists' });
    }

    let employee;
    if (role === 'employee') {
      const position = await JobPosition.findById(jobPosition);
      if (!position) {
        return res.status(404).json({ msg: 'Job Position not found' });
      }
      employee = new Employee({
        name,
        password, // Mot de passe en texte clair
        role,
        jobPosition,
        skills: position.requiredSkills.map(skill => ({ skill: skill.skill, level: 'N/A' }))
      });
    } else {
      employee = new Employee({
        name,
        password, // Mot de passe en texte clair
        role
      });
    }

    await employee.save();

    const token = jwt.sign({ employeeId: employee._id }, process.env.JWT_SECRET, { expiresIn: '3h' });

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


exports.login = async (req, res) => {
  const { name, password } = req.body;

  console.log("Requête reçue :", req.body);

  try {
    // Chercher l'utilisateur par son nom
    const employee = await Employee.findOne({ name });
    if (!employee) {
      console.log("Utilisateur non trouvé :", name);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    console.log("Utilisateur trouvé :", employee);

    // Comparaison du mot de passe (texte clair pour ce cas)
    if (password !== employee.password) {
      console.log("Mot de passe incorrect pour :", name);
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Générer le token
    const token = jwt.sign(
      { employeeId: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    );

    console.log("Connexion réussie pour :", name);

    res.json({ token, role: employee.role });
  } catch (err) {
    console.error("Erreur lors de la connexion :", err);
    res.status(500).send('Server error');
  }
};




