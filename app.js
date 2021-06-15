const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/db');
const cors = require('cors');

const authRoute = require('./routes/auth-route');
const users = require('./routes/user');
const callback = require('./routes/callback');

const { getLogger, logHandler, terminate } = require('@jwt/utils');
require('./config/passport')(passport);

const app = express();
const log = getLogger(__dirname, __filename)
const PORT = process.env.PORT || 4000;


app.use(cors());
app.use(passport.initialize());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(logHandler);

app.use('/api/users', users);
app.use('/api', callback);
app.use('/api', passport.authenticate('jwt', { session: false }), authRoute);

app.disable('etag');
app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.send('Hola api rest! creado por Fernando López');
});

if (!module.parent) {
    app.listen(PORT, () => {
        log.info(`Server funcionando en puerto ${PORT}`);
    })

    process.on('SIGINT', terminate(0, 'SIGINT'))
    process.on('SIGTERM', terminate(0, 'SIGTERM'))
    process.on('uncaughtException', terminate(1, 'uncaughtException'))
    process.on('unhandledRejection', terminate(1, 'unhandledRejection'))
}