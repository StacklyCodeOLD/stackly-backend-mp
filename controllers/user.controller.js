const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { getLogger, logHandler, terminate } = require("@jwt/utils");
const log = getLogger(__dirname, __filename);
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

const { User } = require("../models/User");

async function postRegister(req, res) {
  try {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    await User.findOne({
      email: req.body.email,
    }).then((user) => {
      if (user) {
        return res.status(400).json({
          email: "Email ya existe",
        });
      } else {
        const avatar = gravatar.url(req.body.email, {
          s: "200",
          r: "pg",
          d: "mm",
        });
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          avatar,
          mercadopago: req.body.mercadopago,
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) console.error("Esto es un error", err);
          else {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) console.error("Ups! Error", err);
              else {
                newUser.password = hash;
                newUser.save().then((user) => {
                  res.json(user);
                });
              }
            });
          }
        });
      }
    });
  } catch (err) {
    log.error("Ups hubo un error en el Registro Controller! " + err);
  }
}

async function postLogin(req, res) {
  try {
    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    await User.findOne({ email }).then((user) => {
      if (!user) {
        errors.email = "El usuario no existe";
        return res.status(404).json(errors);
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = {
            id: user.id,
            name: user.name,
            role: user.role,
            avatar: user.avatar,
            mercadopago: user.mercadopago,
          };
          jwt.sign(
            payload,
            "secret",
            {
              expiresIn: 36000,
            },
            (err, jwt) => {
              if (err) console.error("Error en token", err);
              else {
                return res
                  .status(200)
                  .cookie("jwt", `${jwt}`, {
                    //sameSite: true,
                    path: "/",
                    httpOnly: true,
                    secure: false,
                  })
                  .json({
                    error: false,
                    status: 202,
                    message: "Logueado Exitosamente!",
                    //jwt,
                  });
              }
            }
          );
        } else {
          errors.password = "Contrase??a incorrecta";
          return res.status(400).json(errors);
        }
      });
    });
  } catch (err) {
    log.error("Ups hubo un error en el Login Controller! " + err);
  }
}

async function getLogout(req, res) {
  res.clearCookie('jwt');
  res.status(200).json({
    message: "ok"
  })
}

module.exports = {
  postRegister,
  postLogin,
  getLogout
};
