const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const hangerSchema = new Schema(
  {
    name: { type: String },
    type: { type: String },
    colors: { type: [String] },
    state: { type: Boolean, default: true },
    image: {type: String, default: "https://www.clipartwiki.com/clipimg/full/8-86574_computer-icons-clothing-transprent-transparent-background-dress-png.png"}
  },
  {
    timestamps: true
  }
);

const Hanger = mongoose.model("Hanger", hangerSchema);
module.exports = Hanger;
