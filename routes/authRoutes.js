const express = require("express");
const {
  changeUserRole,
  registerUser,
  loginUser,
  getAllUsers,
  createUserByAdmin,
  resetAllLeaves
} = require("../controllers/authController");

const User = require("../models/User");
const router = express.Router();

// PUBLIC
router.post("/register", registerUser);
router.post("/login", loginUser);

// GET SINGLE USER
router.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

// SUPERADMIN FEATURES
router.get("/all-users", getAllUsers);
router.post("/create-user", createUserByAdmin);
router.put("/reset-leaves", resetAllLeaves);
router.put("/change-role/:id", changeUserRole); 

module.exports = router;
