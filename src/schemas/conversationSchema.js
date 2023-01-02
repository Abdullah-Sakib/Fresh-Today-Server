const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    members: {
        type: Array,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now,
    }
});

module.exports = conversationSchema;