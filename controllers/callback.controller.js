const axios = require("axios");
const { User, Usermp } = require("../models/User");

async function getMercadoPago(req, res) {
  try {
    const resulta = await axios.post(
      "https://api.mercadopago.com/oauth/token",
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code: req.query.code,
        grant_type: "authorization_code",
        redirect_uri: "http://localhost:4000/api/callback",
      }
    );

    const user_me = await axios.get("https://api.mercadolibre.com/users/me", {
      params: {
        access_token: resulta.data.access_token,
      },
    });

    // const user_token = await axios.get("http://localhost:4000/api/profile", {
    //   headers: {
    //     'Authorization': `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzdkMGIzNGRmNmE4NGY3M2FjZjc0NSIsIm5hbWUiOiJjcmFpZyIsInJvbGUiOiJ1c3VhcmlvIiwiYXZhdGFyIjoiLy93d3cuZ3JhdmF0YXIuY29tL2F2YXRhci8wZTRhY2ZkNTk0YjRmODA5MTMwYWE0MDAwMmI4ZDRhYz9zPTIwMCZyPXBnJmQ9bW0iLCJtZXJjYWRvcGFnbyI6W10sImlhdCI6MTYyMzc4NTY1NywiZXhwIjoxNjIzNzg5MjU3fQ.G_1hqdU9fCmIASjTDmp69UF6YxQYUMCShUhxTWjZJgA"}`
    //   }
    // })

    const user_mp = new Usermp({
      _id: user_me.data.id,
      status: "active",
      email_mp: user_me.data.email,
      nickname_mp: user_me.data.nickname,
      client_id: resulta.data.access_token,
      refresh: resulta.data.refresh_token,
    });

    await user_mp.save();

    res.status(200).json({
      message: 'ok'
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.response.data.message,
    });
  }
}

module.exports = {
  getMercadoPago,
};
