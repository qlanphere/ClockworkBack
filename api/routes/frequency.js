const express = require('express');
const router = express.Router();
const freqController = require('../controllers/frequency.js')
const newToken = require('../middleware/auth')

router.get('/',newToken.verifyToken, freqController.indexFreqs)
router.get('/:id',newToken.verifyToken, freqController.show)
router.patch('/:id', newToken.verifyToken, freqController.updateFreq)


module.exports = router;