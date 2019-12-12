const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const cartSchema = new Schema(
  {
    shopItems: [{ type: Schema.Types.ObjectId, ref: "Hanger" }],
    dateStart: { type: Date },
    dateFinish: { type: Date },
    days: { type: Number },
    totalPrice: { type: Number },
    open: { type: Boolean, default: true },
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
