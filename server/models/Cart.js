const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const cartSchema = new Schema(
  {
    createdBy: { type: Schema.Types.ObjectId,ref: "User" },
    shopItems: [{ type: Schema.Types.ObjectId, ref: "Hanger" }],
    dateStart: { type: Date, default: null},
    dateFinish: { type: Date, default: null },
    days: { type: Number, default: 0},
    totalPrice: { type: Number, default: 0 },
    open: { type: Boolean, default: true },
  },
  {
    timestamps: true
  }
);

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
