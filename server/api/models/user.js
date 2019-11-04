const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
	// _id: mongoose.Schema.Types.ObjectId,
	username: String,
	email: String,
	birthday: Date,
	age: Number,
	photo: String,
	phone: String
});

module.exports = mongoose.model("User", userSchema);
