import { Schema, model } from "mongoose";

interface ICart {
  userId: string;
  products: [{ productId: string; quantity: number }];
}

const CartSchema = new Schema<ICart>(
  {
    userId: {
      type: String,
      required: true,
    },

    products: [
      {
        productId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },

  { timestamps: true }
);

export default model<ICart>("Cart", CartSchema);
