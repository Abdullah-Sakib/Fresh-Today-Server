const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = mongoose.model("users", userSchema);

router.get('/', (req, res) => {
    res.send("user route is working");
});
    // SIGNUP
    router.post('/signup', async (req, res) => {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const newUser = {
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role
        };

        const user = await User.find({username: newUser.username});
        if(user.length > 0){
            res.status(409).send('Username already exists');
        }

        const email = await User.find({email: newUser.email});
        if(email.length > 0){
            res.status(409).send('Email already exists');
        }

        const result = await User.create(newUser);
        if(result){
            res.status(201).send('User created successfully');
        }
        else{
            res.status(500).send('Something went wrong');
        }
    });

    // LOGIN
    router.post('/login', async (req, res) => {
        const username = req.body.username;
        const user = await User.find({username: username});
        if(user == null){
            res.status(401).send('Authentication failed');
        }
        else{
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if(isValidPassword){
                const token = jwt.sign({username}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
                res.send({accessToken: token});
            }
            else{
                res.status(401).send('Authentication failed');
            }
        }
    });

module.exports = router;