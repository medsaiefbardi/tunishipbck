const express = require('express');
const router = express.Router();
const jobPositionController = require('../controllers/jobPositionController');
const { authMiddleware, hrHeadMiddleware } = require('../middleware/authMiddleware');

router.post('/', authMiddleware, hrHeadMiddleware, jobPositionController.createJobPosition);
router.get('/',  jobPositionController.getAllJobPositions);
router.put('/:id', authMiddleware, hrHeadMiddleware, jobPositionController.updateJobPosition);
router.delete('/:id', authMiddleware, hrHeadMiddleware, jobPositionController.deleteJobPosition);

module.exports = router;
