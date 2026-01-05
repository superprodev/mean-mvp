const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    convId: {
        type: String
    },
    from: {
        type: String
    },
    to: {
        type: String
    },
    content: {
        type: String
    },
    date: {
        type: Date
    }
});

module.exports = mongoose.model('messages', MessageSchema);