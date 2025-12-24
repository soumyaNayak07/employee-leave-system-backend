const User = require("../models/User");

// REGISTER USER
exports.registerUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ message: "User registered", user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// LOGIN USER
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password
    });

    if (!user) return res.json({ message: "Invalid credentials" });

    res.json({ message: "Login success", user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// GET ALL USERS (superadmin only)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.json({ error: error.message });
  }
};

// CREATE USER BY SUPERADMIN
exports.createUserByAdmin = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ message: "User created", user });
  } catch (error) {
    res.json({ error: error.message });
  }
};

// RESET ALL LEAVES
exports.resetAllLeaves = async (req, res) => {
  try {
    await User.updateMany({}, { remainingLeaves: 20 });
    res.json({ message: "All leaves reset to 20" });
  } catch (error) {
    res.json({ error: error.message });
  }
};


// / CHANGE USER ROLE
exports.changeUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    // ✅ validate role
    if (!["employee", "manager", "superadmin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // ✅ update role
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true } // IMPORTANT
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Role updated successfully",
      user: updatedUser
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
