const Game = require("../models/game");
const Item = require("../models/item");

function index(req, res) {
	// Game.find({ _id: "619c93cad6735eceff1c4fbd" }, function (err, game) {
	// 	console.log(game);
	// });
	Item.find({}, function (err, items) {
		res.render("items/index", { items });
	});
}

function show(req, res) {
	Item.findById(req.params.id, function (err, item) {
		Game.findById(item.game, function (err, game) {
			// console.log(game);
			res.render("items/view", { item, game });
		});
	});
}

module.exports = {
	index,
	show,
};
