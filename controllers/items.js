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

function newItem(req, res) {
	Game.findById(req.params.id, function (err, game) {
		res.render("items/new", { game });
	});
}

function create(req, res) {
	// Delete empty keys for defaults to take
	// for (let key in req.body) {
	// 	if (req.body[key] === "") delete req.body[key];
	// }
	// Add game id based on Url path
	// req.body.game = req.params.g_id;
	// Save item into db
	const item = new Item(req.body);

	item.save(function (err) {
		res.send("bruh");
	});

	// item.save(function (err) {
	// 	Game.findById(item.game, function (err, game) {
	// 		if (err) return res.send(err.message);
	// 		console.log(game);
	// 		res.render("items/view", { item, game });
	// 	});
	// });
}

module.exports = {
	index,
	show,
	new: newItem,
	create,
};
