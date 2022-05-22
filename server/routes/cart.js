const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyJWT");
const Cart = require("../models/cart");

const router = require("express").Router();

// CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const cart = await newCart.save();
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      // TODO cambiar este metodo $set por uno mas apropiado
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: err });
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Cart deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET USER CART.
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.id });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET ALL PRODUCTS.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;
