import { Schema, model } from "mongoose";

const schema = new Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "products", required: true },
      quantity: { type: Number, default: 1 },
    },
  ],
});

export const CartsModel = model("carts", schema);
