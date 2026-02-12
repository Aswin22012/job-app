const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  UserName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  Phonenumber: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String, // URL or file path to the profile image
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
