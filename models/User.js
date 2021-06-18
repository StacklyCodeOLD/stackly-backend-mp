// User.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const rolesValidos = {
    values: ['administrador', 'usuario'],
    message: '{ VALUE } no es un rol valido'
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    role: {
        type: String, default: 'usuario', enum: rolesValidos
    },
    date: {
        type: Date,
        default: Date.now
    },
    mercadopago: [{
        type: Schema.Types.Mixed, ref: 'Usermp'
    }]
});

const UsermpSchema = new Schema({
    _id: {
      type: String,
      //required: true,
    },
    status: {
      type: String,
      //required: true,
    },
    email_mp: {
      type: String,
      //required: true,
    },
    nickname_mp: {
      type: String,
      //required: true,
    },
    client_id: {
      type: String,
      //required: true,
    },
    refresh: {
      type: String,
      //required: true,
    },
});

const Usermp = mongoose.model("Usermp", UsermpSchema);
const User = mongoose.model('Users', UserSchema);

module.exports = {User, Usermp} ;