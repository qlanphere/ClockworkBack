const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits.js')
const newToken = require('../middleware/auth')

router.get('/:id',newToken.verifyToken, habitsController.show)
router.get('/user/:id', newToken.verifyToken, habitsController.getHabits)
router.post('/', newToken.verifyToken,habitsController.create)
router.patch('/:id',newToken.verifyToken,habitsController.update)
router.delete('/:id',newToken.verifyToken,habitsController.destroy)



module.exports = router;