const {User, Usermp} = require('../models/User');
//const passport = require('passport');
const gravatar = require('gravatar');
const { getLogger } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)

async function getProfile(req, res, next) {
    try {
        const mercadopago = await Usermp.findById("454279294").populate('Usermp')

        return res.status(200).json({
            id: req.user.id,
            name: req.user.name,
            role: req.user.role,
            avatar: req.user.avatar,
            email: req.user.email,
            mercadopago: {
                id: mercadopago._id,
                email: mercadopago.email_mp,
                nickname: mercadopago.nickname_mp,
                status: mercadopago.status
            },
            token: req.query.secret_token,
            productos_url: '/api/domain'
        });
    } catch (err) {
        log.error('Ups Hubo un error! ' + err);
    }
}

module.exports = {
    getProfile
};