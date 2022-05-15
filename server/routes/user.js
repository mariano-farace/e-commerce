const router = require("express").Router();
const User = require("../models/User");
const { verifyTokenAndAuthorization } = require("./verifyJWT");
const { hashPassword } = require("../helpers");

// Change user details 1h
// TODO esto hay que revisarlo, porque si se le ocurre mandar isAdmin desde el front, podrian cambiarlo, definitivamente hay que modificarlo
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    req.body.password = await hashPassword(req.body.password);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      // TODO cambiar este metodo $set por uno mas apropiado
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: err });
  }
});

module.exports = router;
