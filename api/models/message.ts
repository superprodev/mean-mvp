import mongoose, { Schema } from "mongoose";

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

export default mongoose.models["messages"] || mongoose.model('messages', MessageSchema);