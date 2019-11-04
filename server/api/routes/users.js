const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

router.get("/", (req, res, next) => {
	User.find({}).then(users => {
		res.send(users);
	});
});

router.post("/", (req, res, next) => {
	User.create(req.body).then(user => {
		res.status(201).send(user);
	});
});

router.put("/:userId", (req, res, next) => {
	User.findByIdAndUpdate({ _id: req.params.userId }, req.body).then(() => {
		User.findOne({ _id: req.params.userId }).then(user => {
			res.status(200).send(user);
		});
	});
});

router.patch("/:userId", (req, res, next) => {
	User.findByIdAndUpdate({ _id: req.params.userId }, req.body).then(() => {
		User.findOne({ _id: req.params.userId }).then(user => {
			res.status(200).send(user);
		});
	});
});

router.delete("/:userId", (req, res, next) => {
	User.deleteOne({ _id: req.params.userId }).then(user => {
		res.status(200).send(user);
	});
});

module.exports = router;
