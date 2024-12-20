const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/Passport_Js_Setup_Db");

const userSchema = new mongoose.Schema(
  {
    username: String,
    fullname: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.plugin(plm);

module.exports = mongoose.model("user", userSchema);
