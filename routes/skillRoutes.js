const express = require('express');
const router = express.Router();
const skillController = require('../controllers/skillController');
const { authMiddleware, hrHeadMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, hrHeadMiddleware, skillController.createSkill);
router.get('/', authMiddleware, skillController.getAllSkills);
router.put('/:id', authMiddleware, hrHeadMiddleware, skillController.updateSkill);
router.delete('/:id', authMiddleware, hrHeadMiddleware, skillController.deleteSkill);

module.exports = router;
