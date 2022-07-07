import { Schema, model } from "mongoose";

interface IProduct {
  title: string;
  description: string;
  img: string;
  categories: string[];
  size: string[];
  color: string[];
  price: number;
  inStock: boolean;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    categories: [{ type: String, required: true }],
    size: [{ type: String }],

    color: [{ type: String }],
    price: {
      type: Number,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

export default model<IProduct>("Product", ProductSchema);
