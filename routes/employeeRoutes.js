const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');
const { authMiddleware, hrHeadMiddleware } = require('../middleware/authMiddleware');

router.get('/profile', authMiddleware, employeeController.getProfile);
router.get('/', authMiddleware, hrHeadMiddleware, employeeController.getAllEmployees);
router.get('/:id', authMiddleware, employeeController.getEmployeeById);
router.put('/:id', authMiddleware, hrHeadMiddleware, employeeController.updateEmployee);
router.delete('/:id', authMiddleware, hrHeadMiddleware, employeeController.deleteEmployee);
router.post('/', authMiddleware, hrHeadMiddleware, employeeController.createEmployee);
router.post('/:id/add-skill', authMiddleware, hrHeadMiddleware, employeeController.addSkillToEmployee);
router.post('/:id/remove-skill', authMiddleware, hrHeadMiddleware, employeeController.removeSkillFromEmployee);
router.put('/:employeeId/skills/:skillId', authMiddleware, hrHeadMiddleware, employeeController.updateSkillLevel);

module.exports = router;
