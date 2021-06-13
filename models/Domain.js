const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DomainSchema = new Schema({
    name: { type: String },
    description: { type: String },
    link: { type: String },
    seen: { type: Number },

});

const Domain = mongoose.model('Domain', DomainSchema);

module.exports = {
    Domain,
};