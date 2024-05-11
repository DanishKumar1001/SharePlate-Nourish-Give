const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = "mongodb+srv://abdulmueezgujjar:rRZhAiAniyrfiTgm@cluster0.6v54j4q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    await mongoose.connect(db);
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
