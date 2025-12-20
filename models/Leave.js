const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema({
  userId: String,
  name: String,
  leaveType: String,
  startDate: String,
  endDate: String,
  reason: String,
  status: {
    type: String,
    default: "Pending"
  }
});

module.exports = mongoose.model("Leave", LeaveSchema);
