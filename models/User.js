const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["employee", "manager", "superadmin"],
    default: "employee"
  },
  remainingLeaves: {
    type: Number,
    default: 20
  }
});

module.exports = mongoose.model("User", UserSchema);
