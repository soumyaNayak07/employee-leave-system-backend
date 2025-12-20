const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected 👍");
  } catch (error) {
    console.log("MongoDB Connection Error ❌");
    console.log(error.message);
  }
};

module.exports = connectDB;
