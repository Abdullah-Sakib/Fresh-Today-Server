const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const productSchema = require("../schemas/productSchema");
const Product = mongoose.model("products", productSchema);

router.get('/', (req, res) => {
    Product.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

router.post('/', (req, res) => {
    const product = req.body;
    const newProduct = new Product(product);
    newProduct.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

router.get('/:name', (req, res) => {
    const name = req.params.name;
    Product.find({productName: name}, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

module.exports = router;