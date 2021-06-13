const express = require('express');
const router = express.Router();
const callbackController = require('../controllers/callback.controller');


router.route('/callback')
    .get(callbackController.getMercadoPago);

module.exports = router;