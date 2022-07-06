import Product, {
  findByIdAndUpdate,
  findByIdAndDelete,
  findById,
  find,
} from "../models/Products";
import { verifyTokenAndAdmin } from "./verifyJWT";

import express from "express";
const router = express.Router();

// TODO estos endpoints no estan verificando la informacion que viene en el body, hace falta hacer eso, talvez con TS

// CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await findByIdAndUpdate(
      req.params.id,
      // TODO cambiar este metodo $set por uno mas apropiado
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    console.log("err", err);
    res.status(500).json({ message: err });
  }
});

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET PRODUCT.
router.get("/find/:id", async (req, res) => {
  try {
    const product = await findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

// GET ALL PRODUCTS.
router.get("/", async (req, res) => {
  const queryNew = req.query.new;
  const queryCategory = req.query.category;

  try {
    let products;

    if (queryNew) {
      products = await find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await find({
        categories: {
          $in: [queryCategory],
        },
      });
    }
    // If no query is specified, return all products
    else {
      products = await find();
    }

    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

export default router;
