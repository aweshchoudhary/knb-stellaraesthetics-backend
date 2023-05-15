const mongoose = require("mongoose");
const ROLES_LIST = require("../../config/roles_list");

//------------ User Schema ------------//
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ROLES_LIST,
      required: true,
      default: "user",
    },
  },
  { timestamps: true }
);

UserSchema.index({
  fullname: "text",
  username: "text",
  email: "text",
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
