const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits.js')


router.get('/:id', habitsController.show)
router.post('/', habitsController.create)
router.delete('/:id',habitsController.destroy)

module.exports = router;