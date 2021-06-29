const axios = require("axios");
const { User, Usermp } = require("../models/User");

async function getMercadoPago(req, res) {
  try {
    console.log(req.cookies)
    const resulta = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: `https://stackly-mercado-pago.herokuapp.com/api/callback`,
      }
    );

    const user_me = await axios.get("https://api.mercadolibre.com/users/me", {
      params: {
        access_token: resulta.data.access_token,
      },
    });

    const user_mp = new Usermp({
      id: user_me.data.id,
      status: "active",
      email_mp: user_me.data.email,
      nickname_mp: user_me.data.nickname,
      client_id: resulta.data.access_token,
      refresh: resulta.data.refresh_token,
    });

    await user_mp.save();
    const find_user = await User.findById(req.user.id);
    find_user.mercadopago = user_mp;
    await find_user.save();

    res.status(200).redirect("https://peaceful-jones-09cd49.netlify.app/dashboard")
  } catch (err) {
    res.status(400).json({
      message: err.response.data.message,
    });
  }
}

module.exports = {
  getMercadoPago,
};
