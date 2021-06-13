const { Domain } = require("../models/Domain");
const passport = require("passport");

let contador = 0;

async function getDomain(req, res, next) {
  try {
    let result;
    let countDocument;
    let perPage = req.query.perPage || 3;
    perPage = Number(perPage);

    let page = req.query.page || 1;
    page = Number(page);

    result = await Domain.find({})
      .skip(perPage * page - perPage)
      .limit(perPage)
      .sort({ seen: -1 })
      .exec();

    countDocument = await Domain.countDocuments((err, count) => {
      res.status(200).json({
        status: "Api funcionando",
        result,
        total: count,
        resultados: perPage,
      });
    });

    return countDocument;
  } catch (err) {
    res.status(400).json({
      message: "Hubo un Error",
      message: err,
    });
  }
}

async function updateDomain(req, res) {
  try {
    const { link } = req.query;
    const findDomain = { link: link };

    await Domain.findOneAndUpdate(findDomain, { seen: contador++ });
    res.status(200).json("Dominio Visto con éxito!");
  } catch (err) {
    res.status(400).json({
      message: "Hubo un Error",
      error: err,
    });
  }
}

async function postDomain(req, res) {
  try {
    const link = req.query.link;

    const domain = new Domain({
      name: req.body.name,
      description: req.body.description,
      link: req.query.link,
      seen: 0,
    });

    if (link) {
      await domain.save(() => {
        res.status(201).json("Dominio agregado con éxito!");
      });
    } else {
      res.status(400).json({
        message: "Falta parametro link",
      });
    }
  } catch (err) {
    res.status(400).json({
      message: "Hubo un error",
      error: err,
    });
  }
}

module.exports = {
  getDomain,
  updateDomain,
  postDomain,
};
