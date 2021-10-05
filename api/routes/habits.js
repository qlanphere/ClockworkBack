const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits.js')
const newToken = require('../middleware/auth')

router.get('/', habitsController.index)
router.get('/:id', habitsController.show)
router.get('/user/:name', habitsController.getHabits)
router.post('/', habitsController.create)
router.patch('/:id',habitsController.update)
router.delete('/:id',habitsController.destroy)

module.exports = router;