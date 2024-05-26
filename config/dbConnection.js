const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = "mongodb+srv://danish:Danish123@cluster0.spb9vue.mongodb.net/";
    // const db = "mongodb://localhost:27017";
    await mongoose.connect(db);
    console.log("Cloud MongoDB Cluster connected...");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
