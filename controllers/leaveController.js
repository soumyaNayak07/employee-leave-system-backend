const Leave = require("../models/Leave");
const User = require("../models/User");

// APPLY LEAVE
exports.applyLeave = async (req, res) => {
  try {

    if (!req.body.userId) {
      return res.json({ message: "User ID is missing" });
    }

    const user = await User.findById(req.body.userId);
    if (!user) return res.json({ message: "User not found" });

    const start = new Date(req.body.startDate);
    const end = new Date(req.body.endDate);

    const days =
      (end - start) / (1000 * 60 * 60 * 24) + 1; // inclusive days

    // check if enough balance
    if (user.remainingLeaves < days) {
      return res.json({ message: "Not enough leave balance" });
    }

    // deduct days
    user.remainingLeaves -= days;
    await user.save();

    // create leave record
    const leave = await Leave.create(req.body);

    res.json({
      message: "Leave applied",
      leave,
      remainingLeaves: user.remainingLeaves
    });

  } catch (error) {
    console.log("APPLY LEAVE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



// GET ALL LEAVES
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find();
    res.json(leaves);
  } catch (error) {
    console.log("GET LEAVES ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



// UPDATE LEAVE STATUS
exports.updateLeave = async (req, res) => {
  try {

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return res.json({ message: "Leave not found" });
    }

    // If rejecting → add days back
    if (req.body.status === "Rejected") {
      const user = await User.findById(leave.userId);

      const start = new Date(leave.startDate);
      const end = new Date(leave.endDate);

      const days =
        (end - start) / (1000 * 60 * 60 * 24) + 1;

      user.remainingLeaves += days;
      await user.save();
    }

    const updatedLeave = await Leave.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({
      message: "Leave updated",
      updatedLeave
    });

  } catch (error) {
    console.log("UPDATE LEAVE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};



// DELETE LEAVE
exports.deleteLeave = async (req, res) => {
  try {
    await Leave.findByIdAndDelete(req.params.id);

    res.json({
      message: "Leave deleted"
    });

  } catch (error) {
    console.log("DELETE LEAVE ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};
