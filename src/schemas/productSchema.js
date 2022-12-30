const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    vendorPhone: String,
    vendorLocation: String,
    image: String,
    productAddtionDate: {
        type: Date,
        default: Date.now,
    },
    vendorName: String,
});

module.exports = productSchema;