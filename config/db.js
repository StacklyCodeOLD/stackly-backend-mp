const mongoose = require('mongoose');
const config = require('@jwt/config')
const { getLogger, terminate } = require('@jwt/utils')
const log = getLogger(__dirname, __filename)

mongoose.Promise = global.Promise;

if (!config.db) {
    log.error('Setee la variable de entorno MONGODB_URL', config.db)
    process.exit(1)
}

mongoose.connect(config.db, { useNewUrlParser: true })
    .then(function() {
        log.info('Conectado a la Base de Datos con éxito!');
    }).catch(function(err) {
        log.error('Ups! Hubo un error al conectar con la base de datos!');
        log.error(err.message);
    });

module.exports = mongoose.connection;