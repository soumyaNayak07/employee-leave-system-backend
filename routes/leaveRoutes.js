const express = require("express");
const {
  applyLeave,
  getLeaves,
  updateLeave,
  deleteLeave
} = require("../controllers/leaveController");

const router = express.Router();

router.post("/apply", applyLeave);
router.get("/", getLeaves);
router.put("/update/:id", updateLeave);
router.delete("/delete/:id", deleteLeave);

module.exports = router;
