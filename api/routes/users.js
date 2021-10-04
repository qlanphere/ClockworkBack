const express = require('express');
const router = express.Router();

const userController = require('../controllers/users');

router.get('/', userController.show);
router.get('/:id',userController.showIndex);
// router.post('/', userController.create);

module.exports = router;