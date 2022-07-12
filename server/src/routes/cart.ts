import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyJWT";
import Cart, { ICart } from "../models/Cart";
import express, { Request, Response } from "express";
import { TypedRequest, TypedRequestBody } from "../@types/types";
const router = express.Router();

// CREATE

router.post(
  "/",
  verifyToken,
  async (req: TypedRequestBody<ICart>, res: Response) => {
    const newCart = new Cart(req.body);

    try {
      const cart = await newCart.save();
      res.status(200).json(cart);
    } catch (err: unknown) {
      res.status(500).json({ message: err });
    }
  }
);

// UPDATE
// TODO comprobrar que  no vas a usar userId
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: TypedRequest<{ id: string }, ICart>, res) => {
    try {
      const updatedCart = await Cart.findByIdAndUpdate(
        req.params.id,
        // TODO cambiar este metodo $set por uno mas apropiado
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedCart);
    } catch (err: unknown) {
      console.log("err", err);
      res.status(500).json({ message: err });
    }
  }
);

// DELETE
router.delete(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response) => {
    try {
      await Cart.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Cart deleted" });
    } catch (err: unknown) {
      res.status(500).json({ message: err });
    }
  }
);

// GET USER CART.
router.get(
  "/find/:userId",
  verifyTokenAndAuthorization,
  async (req: Request, res: Response) => {
    try {
      const cart = await Cart.findOne({ userId: req.params.userId });
      res.status(200).json(cart);
    } catch (err: unknown) {
      res.status(500).json({ message: err });
    }
  }
);

// GET ALL PRODUCTS.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

export default router;
