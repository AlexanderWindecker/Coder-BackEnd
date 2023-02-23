import mongoose from "mongoose";

const cartsSchema = new mongoose.Schema({
  products: {
    type: Array,
  },
});

export const cartsModel = new mongoose.model("Cart", cartsSchema);
