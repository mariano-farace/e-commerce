import express from "express";

import * as argon2 from "argon2";
const User = require("../models/User").default;

const { hashPassword } = require("../helpers");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../config");
const router = express.Router();

router.post("/register", async (req, res) => {
  const passwordHashed = await hashPassword(req.body.password);
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: passwordHashed,
  });

  try {
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    if (err.name === "MongoServerError" && err.code === 11000) {
      res.status(400).json({
        message: "User already exists",
      });
    } else {
      res.status(500).json({ message: err });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    // If user is not found
    if (!user) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    const value = await argon2.verify(user.password, password);
    // If password is incorrect
    if (value === false) {
      return res.status(401).json({ message: "Wrong credentials" });
    }
    // TODO review what you are passing here
    // TODO put this sign token function in helpers methods
    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    // TODO enviar el token como header!
    // TODO verificar que coño pasa user._doc y porque y desde cuando lo necesitas!
    const { password: passwordToDiscard, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;