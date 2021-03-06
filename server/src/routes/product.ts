import Product, { IProduct } from "../models/Products";
import { verifyTokenAndAdmin } from "./verifyJWT";

import express, { Request, Response } from "express";
import { TypedRequestBody } from "../@types/types";
const router = express.Router();

// TODO estos endpoints no estan verificando la informacion que viene en el body, hace falta hacer eso, talvez con TS

// CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const product = await newProduct.save();
    res.status(200).json(product);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// UPDATE
router.put(
  "/:id",
  verifyTokenAndAdmin,
  async (req: TypedRequestBody<IProduct>, res: Response) => {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        req.params.id,
        // TODO cambiar este metodo $set por uno mas apropiado
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedProduct);
    } catch (err: unknown) {
      res.status(500).json({ message: err });
    }
  }
);

// DELETE PRODUCT
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product deleted" });
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

// GET PRODUCT.
router.get("/find/:id", async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err: unknown) {
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
      products = await Product.find().sort({ createdAt: -1 }).limit(5);
    } else if (queryCategory) {
      products = await Product.find({
        categories: {
          $in: [queryCategory],
        },
      });
    }
    // If no query is specified, return all products
    else {
      products = await Product.find();
    }

    res.status(200).json(products);
  } catch (err: unknown) {
    res.status(500).json({ message: err });
  }
});

export default router;
