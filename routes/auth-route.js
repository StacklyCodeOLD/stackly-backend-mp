const express = require('express');
const router = express.Router();

const domainController = require('../controllers/domain.controller');
const profileController = require('../controllers/profile.controller');

router.route('/profile')
    .get(profileController.getProfile);

// Ruta /domain
router.route('/domain')
    .get(domainController.getDomain)
    .put(domainController.updateDomain)
    .post(domainController.postDomain);


module.exports = router;