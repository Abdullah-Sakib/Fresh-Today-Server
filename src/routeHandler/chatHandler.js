const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const chatSchema = require("../schemas/chatSchema");
const Chat = mongoose.model("chats", chatSchema);

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
    const chat = req.body;
    const newChat = new Chat(chat);
    newChat.save((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});


router.get('/:conversationId', (req, res) => {
    const conversationId = req.params.conversationId;
    Chat.find({conversationId:conversationId},(err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// router.get('/:name', (req, res) => {
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