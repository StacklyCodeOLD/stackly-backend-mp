const jwt = require("jsonwebtoken")
const Cookies = require("universal-cookie")
const {User} = require("../models/User")

const isLoggedIn = async (req, res, next) => {
    try {
        let authorizationToken = null;
        const cookies = new Cookies(req.headers.cookie)
        if(cookies.get("jwt")) {
            authorizationToken = cookies.get("jwt")
        } else if (req.headers["authorization"]) {
            authorizationToken = req.headers["authorization"]
        } else {
            authorizationToken = false;
        }

        const token = jwt.verify(authorizationToken, "secret")

        const user = await User.findById(token.id)
        req.user = user
        req.token = token
        next();
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

module.exports = {
    isLoggedIn
}