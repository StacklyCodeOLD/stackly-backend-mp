const express = require("express");
const router = express.Router();

const profileController = require("../controllers/profile.controller");
const processPayment = require("../controllers/process_payment.controller");

router.route("/profile").get(profileController.getProfile);

router.route("/process_payment").post(processPayment.processPayment);

module.exports = router;
