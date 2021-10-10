const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');
//const newToken = require('../middleware/auth')

router.post('/register', authController.create);
router.post('/login', authController.checkLogin);

module.exports = router;