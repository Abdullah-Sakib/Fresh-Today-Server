const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const conversationSchema = require("../schemas/conversationSchema");
const Conversation = mongoose.model("conversation", conversationSchema);

// router.get('/', (req, res) => {
//     Product.find((err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.status(200).send(data);
//         }
//     });
// });

router.post('/', (req, res) => {
    console.log(req.body)
    const members = [req.body.senderID , req.body.receiverID];
    const newConversation = new Conversation(members);
    newConversation.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

router.get('/:id', (req, res) => {
    const id = req.params.id;
    Conversation.find({members:id},(err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// // router.get('/:name', (req, res) => {
//     const name = req.params.name;
//     Product.find({category: name}, (err, data) => {
//         if (err) {
//             res.status(500).send(err);
//         } else {
//             res.status(200).send(data);
//         }
//     });
// });

module.exports = router;