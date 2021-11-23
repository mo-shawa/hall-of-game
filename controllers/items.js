const Game = require("../models/game");
const Item = require("../models/item");

function index(req, res) {
	// Game.find({ _id: "619c93cad6735eceff1c4fbd" }, function (err, game) {
	// 	console.log(game);
	// });
	Item.find({}, function (err, items) {
		res.render("index", { items });
	});
}

function show(req, res) {
	Item.findById(req.params.id, function (err, item) {
		console.log(item);
	});
}

module.exports = {
	index,
	show,
};
