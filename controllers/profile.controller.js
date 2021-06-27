const gravatar = require("gravatar");
const { getLogger } = require("@jwt/utils");

const { User, Usermp } = require("../models/User");
const log = getLogger(__dirname, __filename);

async function getProfile(req, res, next) {
  try {
    if(req.user) {
      res.status(200).json({
        id: req.user.id,
        name: req.user.name,
        role: req.user.role,
        avatar: req.user.avatar,
        email: req.user.email,
        mercadopago: req.user.mercadopago,
        token: req.query.secret_token
      });
    } else {
      res.status(401).json({
        error: true,
        message: "Ups! No estas autorizado"
      })
    }
  } catch (err) {
    log.error("Ups Hubo un error! " + err);
  }
}

module.exports = {
  getProfile,
};
