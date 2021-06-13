const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.route('/register')
    .post(userController.postRegister);

router.route('/login')
    .post(userController.postLogin);

module.exports = router;