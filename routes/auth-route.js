const express = require("express");
const router = express.Router();

const { isLoggedIn } = require("../middlewares/security.middleware");

const profileController = require("../controllers/profile.controller");
const callbackController = require("../controllers/callback.controller");
const processPayment = require("../controllers/process_payment.controller");

router.route("/profile").get(isLoggedIn, profileController.getProfile);
router.route("/callback").get(isLoggedIn, callbackController.getMercadoPago);
router.route("/process_payment").post(processPayment.processPayment);

module.exports = router;
