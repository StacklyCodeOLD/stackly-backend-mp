const mercadopago = require("mercadopago");

async function processPayment(req, res) {
  try {
    mercadopago.configure({
      access_token: req.user.mercadopago[0].client_id,
    });

    const preference = {};

    const item = {
      title: "Pack 50 Stackly Coins",
      unit_price: 50,
      currency_id: "ARS",
      quantity: 1,
    };

    preference.items = [item];
    preference.back_urls = {
      success: "http://localhost:3000/dashboard",
    };
    preference.auto_return = "approved";
    preference.marketplace_fee = 3; // cobro comision.

    mercadopago.preferences.create(preference).then((response) => {
      res.status(200).json({
        preferenceId: response.body.id,
        urlId: response.body.init_point,
      });
    });
  } catch (error) {
    res.status(404).json({
      message: "Error!",
    });
  }
}

module.exports = {
  processPayment,
};
