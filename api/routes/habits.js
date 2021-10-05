const express = require('express');
const router = express.Router();
const habitsController = require('../controllers/habits.js')
const newToken = require('../middleware/auth')

<<<<<<< HEAD


router.get('/', newToken.verifyToken, habitsController.index)
router.get('/:id', newToken.verifyToken, habitsController.show)
router.post('/:id', newToken.verifyToken, habitsController.create)        //creates a new habit for the existing user id - user id
router.delete('/:id', newToken.verifyToken, habitsController.destroy)
=======
router.get('/', habitsController.index)
router.get('/:id', habitsController.show)
router.get('/user/:id', habitsController.getHabits)
router.post('/', habitsController.create)
router.patch('/:id',habitsController.update)
router.delete('/:id',habitsController.destroy)
>>>>>>> a43926d639ae5ee4c23ea1f4e5b764944855a5d8

module.exports = router;