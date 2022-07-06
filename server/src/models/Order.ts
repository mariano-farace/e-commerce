import { Schema, model } from "mongoose";

const OrderSchema = new Schema(
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
    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: Object,
    },
    status: {
      type: String,
      default: "pending",
    },
  },

  { timestamp: true }
);

export default model("Order", OrderSchema);
