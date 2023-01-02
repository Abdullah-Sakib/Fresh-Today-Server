const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const userSchema = require("../schemas/userSchema");
const User = mongoose.model("users", userSchema);

router.get("/:role", (req, res) => {
  const userRole = req.params.role;
  User.find({ role: userRole }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  User.find({ _id: id }, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// SIGNUP
router.post("/signup", async (req, res) => {
  const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);

  const newUser = {
    username: req.body.username,
    email: req.body.userEmail,
    password: hashedPassword,
    role: req.body.role,
  };

  const user = await User.find({ username: newUser.username });
  if (user.length > 0) {
    res.status(409).json("Username already exists");
  }

  const email = await User.find({ email: newUser.email });
  if (email.length > 0) {
    res.status(409).json("Email already exists");
  }

  const result = await User.create(newUser);
  if (result) {
    res.status(201).json("User created successfully");
  } else {
    res.status(500).json("Something went wrong");
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  const email = req.body.userEmail;
  const user = await User.find({ email: email });
  const userInfo = {
    email: user[0].email,
    username: user[0].username,
    role: user[0].role,
  };
  if (user == null) {
    res.status(401).json("Authentication failed: user not found");
  } else {
    const isValidPassword = await bcrypt.compare(
      req.body.userPassword,
      user[0].password
    );
    if (isValidPassword) {
      const token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1d",
      });
      res.send({ user: userInfo, accessToken: token });
    } else {
      res.status(401).json("Authentication failed: invalid password");
    }
  }
});

module.exports = router;
