const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://hashemfrehhat:HASHEM@hashem.oj0ir.mongodb.net/?retryWrites=true&w=majority&appName=Hashem",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
module.exports = connectDB;
