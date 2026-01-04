const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        trim: true,
        unique: true
    },
    firstname: {
        type: String
    },
    lastname: {
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
        type: Number
    },
    code: {
        type: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    active: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('users', UserSchema);