const express = require('express');
const router = express.Router();
const { isLoggedIn } = require("../middlewares/security.middleware");

const userController = require('../controllers/user.controller');


router.route('/register')
    .post(userController.postRegister);

router.route('/login')
    .post(userController.postLogin);

router.route('/logout')
    .get(userController.getLogout);

module.exports = router;