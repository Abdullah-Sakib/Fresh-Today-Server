const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({


    conversationId: {
        type: String,
        required: true,
    },
    senderId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = chatSchema;