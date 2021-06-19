const axios = require("axios");
const { User, Usermp } = require("../models/User");

async function getMercadoPago(req, res) {
  try {
    // const token = await axios.post(`http://localhost:4000/api/users/login`, {
    //   email: req.user.email,
    //   password: req.user.password,
    // });

    const resulta = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: `http://localhost:4000/api/callback`,
      }
    );

    const user_me = await axios.get("https://api.mercadolibre.com/users/me", {
      params: {
        access_token: resulta.data.access_token,
      },
    });

    // const user_token = await axios.get(`http://localhost:4000/api/profile`, {
    //   headers: {
    //     Authorization: `Bearer ${token.data.jwt}`,
    //   },
    // });

    const user_mp = new Usermp({
      _id: req.user.id,
      status: "active",
      email_mp: req.user.email,
      nickname_mp: req.user.nickname,
      client_id: resulta.data.access_token,
      refresh: resulta.data.refresh_token,
    });

    await user_mp.save();
    const find_user = await User.findById(req.user.id);
    find_user.mercadopago = user_mp;
    await find_user.save();

    res.status(200).json({
      message: "ok",
      find_user,
    });
  } catch (err) {
    res.status(400).json({
      message: err.response.data.message,
    });
  }
}

module.exports = {
  getMercadoPago,
};
