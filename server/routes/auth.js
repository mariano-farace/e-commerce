const router = require("express").Router();
const User = require("../models/User");
const { hashPassword } = require("../helpers");

// TODO error handling: si ya existe el usuario, no se puede crear

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
    console.log("err", err);
    res.status(400).json({ message: err });
  }
});

module.exports = router;
