const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "*");
	res.header("Access-Control-Allow-Credentials", true);
	res.header("Access-Control-Allow-Methods", "*");

	req.header("Access-Control-Allow-Origin", "*");
	req.header("Access-Control-Allow-Headers", "*");
	req.header("Access-Control-Allow-Credentials", true);
	req.header("Access-Control-Allow-Methods", "*");
	next();
});

const usersRoutes = require("./api/routes/users");

app.use("/users", usersRoutes);

const mongoose = require("mongoose");

mongoose.connect(
	"mongodb://localhost/freeua_test",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	},
	err => {
		if (err) throw err;
		else console.log("Successfully connected to Mongo");
	}
);

app.use((req, res, next) => {
	const error = new Error("Not found");
	error.status = 404;
	next(error);
});

app.use((error, req, res, next) => {
	res.status(error.status || 500);
	res.json({
		error
	});
});

module.exports = app;
