const mongoose = require("mongoose");
const validater = require("validater");

const userschema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      // validate(value) {
      //   if (!validater.isEmail(value)) {
      //     throw new Error("Email is Invalid");
      //   }
      // }
    },
    password: {
      type: String,
      required: true
    },
    mo: {
      type: Number,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    dob: {
      type: String,
      required: true
    },
    profile: {
      type: String,
      default: "./images/default.png",
      required: true
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    }
  },
  { timestamps: true }
);
const user = mongoose.model("user", userschema);
module.exports = user;
