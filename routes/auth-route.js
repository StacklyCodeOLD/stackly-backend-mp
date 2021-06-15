const express = require('express');
const router = express.Router();

const profileController = require('../controllers/profile.controller');

router.route('/profile')
    .get(profileController.getProfile);


module.exports = router;