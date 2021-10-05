const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits.js')
const newToken = require('../middleware/auth')



router.get('/', newToken.verifyToken, habitsController.index)
router.get('/:id', newToken.verifyToken, habitsController.show)
router.post('/:id', newToken.verifyToken, habitsController.create)        //creates a new habit for the existing user id - user id
router.delete('/:id', newToken.verifyToken, habitsController.destroy)

module.exports = router;