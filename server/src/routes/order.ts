// TODO sacar esta regla
import {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} from "./verifyJWT";
import Order from "../models/Order";

import express from "express";
const router = express.Router();

// CREATE

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const order = await newOrder.save();
    res.status(200).json(order);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      // TODO cambiar este metodo $set por uno mas apropiado
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order deleted" });
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// GET USER ORDER.
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const fUserID = req.params.userId;
    const order = await Order.find({ userId: fUserID });
    res.status(200).json(order);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// GET ALL ORDERS.
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// GET MONTHLY INCOME

router.get("/monthlyIncome", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

  try {
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: previousMonth,
          },
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      },
    ]);

    res.status(200).json(income);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

export default router;
