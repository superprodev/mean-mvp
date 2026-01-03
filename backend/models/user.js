const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        unique
    },
    name: {
        type: String
    },
    password: {
        type: String
    },
    birthday: {
        type: String
    },
    balance: {
        type: Number
    },
    plan: {
        type: Number
    },
    privilege: {
        type: String
    },
    verified: {
        type: Boolean
    },
    active: {
        type: Boolean
    }
});

module.exports = mongoose.model('users', UserSchema);