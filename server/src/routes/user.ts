import { verifyTokenAndAuthorization, verifyTokenAndAdmin } from "./verifyJWT";
import { hashPassword } from "../helpers";
import express from "express";
import User from "../models/User";
import { TypedRequestBody } from "../@types/types";
const router = express.Router();

// TODO comprobar si vale la pena separar las rutas de usuario y de admin
// CHANGE USER DETAILS
// TODO esto hay que revisarlo, porque si se le ocurre mandar isAdmin desde el front, podrían cambiarlo, definitivamente hay que modificarlo
router.put(
  "/:id",
  verifyTokenAndAuthorization,
  async (req: TypedRequestBody<{ password: string }>, res) => {
    if (req.body.password) {
      req.body.password = await hashPassword(req.body.password);
    }

    try {
      // TODO cambiar el método $set por uno mas apropiado
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedUser);
    } catch (err: unknown) {
      console.log("err", err);
      res.status(500).json({ message: err });
    }
  }
);

// DELETE USER
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// GET USER. ONLY ADMIN CAN DO THIS
router.get("find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    // TODO aca el user esta devolviendo el password, modificarlo con destructuring para sacar el pass del medio

    res.status(200).json(user);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// GET ALL USER. ONLY ADMIN CAN DO THIS
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;

  try {
    const users = query
      ? // TODO Comprobar esto, los esta ordenando por id, no por fecha, deberías poner created at????
        await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// GET USER STATS. ONLY ADMIN CAN DO THIS. Return users registered by period of time

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  // TODO revisar esta query
  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

export default router;

// TODO generar usuarios sin info!!
