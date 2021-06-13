'use strict'

const pkg = require('../package.json')
const { MONGODB_URL } = process.env;

const config = {
    db: MONGODB_URL
}

Object.assign(config, { pkg })

module.exports = config