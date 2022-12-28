const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const categorySchema = require("../schemas/categorySchema");
const Category = mongoose.model("categorises", categorySchema);

router.get('/', (req, res) => {
    Category.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

module.exports = router;