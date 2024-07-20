const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');

exports.authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.employeeId = decoded.employeeId;

    const employee = await Employee.findById(req.employeeId);
    if (!employee) {
      return res.status(401).json({ msg: 'Employee not found' });
    }

    req.employee = employee;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

exports.hrHeadMiddleware = (req, res, next) => {
  if (req.employee.role !== 'hr_head') {
    return res.status(403).json({ msg: 'Access denied, only HR Heads allowed' });
  }
  next();
};
