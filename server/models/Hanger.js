const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const hangerSchema = new Schema(
  {
    name: { type: String },
    type: { type: String },
    subType: [{ type: String }],
    colors: [{ type: String }],
    size: [{ type: String }],
    times: { type: String },
    price: { type: Number},
    state: { type: Boolean, default: true },
    images: [{
      type: String,
      default:
        "https://www.clipartwiki.com/clipimg/full/8-86574_computer-icons-clothing-transprent-transparent-background-dress-png.png"
    }]
  },
  {
    timestamps: true
  }
);

const Hanger = mongoose.model("Hanger", hangerSchema);
module.exports = Hanger;
