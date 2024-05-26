const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    gender: { type: String, enum: ["male", "female"] },
    address: String,
    phone: Number,
    joinedTime: { type: Date, default: Date.now },
    role: { type: String, enum: ["admin", "donor", "agent"], required: true }
});

const User = mongoose.model("User", userSchema); // Ensure the model name here is "User"
module.exports = User;
