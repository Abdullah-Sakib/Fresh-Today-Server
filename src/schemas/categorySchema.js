const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    image: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    }
});

module.exports = categorySchema;