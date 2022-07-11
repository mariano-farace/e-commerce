import { Schema, model } from "mongoose";

// TODO hacer de status un enum
// TODO crear un tipo para adress, todavia no conoces la forma porque se implementa con stripe!
export interface IOrder {
  userId: string;
  products: [{ productId: string; quantity: number }];
  amount: number;
  address: any;
  status: string;
}

const OrderSchema = new Schema<IOrder>(
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

  { timestamps: true }
);

export default model<IOrder>("Order", OrderSchema);
