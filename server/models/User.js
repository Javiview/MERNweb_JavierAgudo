const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, minlength: 2 },
    picture: { type: String, default: "https://res.cloudinary.com/dexfqvxax/image/upload/v1576833874/ResourcesIMPERIO/user_default_cloth_fob5fv.jpg" }
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.createdAt;
        return ret;
      }
    }
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
