const Game = require("../models/game");
const Item = require("../models/item");

function index(req, res) {
	Game.find({}, function (err, games) {
		res.render("games/index", { games });
	});
}

function show(req, res) {

	Item.find({ game: req.params.id })
		.populate("game").exec(function (err, items) {
			if (err) return res.send(err.message);
			res.render('games/view', { items });

			// Game.findById(req.params.id, function (err, game) {
			// 	Item.find({ game: game._id }, function (err, items) {
			// 		console.log(items);
			// 		res.render("games/view", { game, items });
			// 	});
			// });
		});
}

function newGame(req, res) {
	res.render("games/new");
}

function create(req, res) {
	for (let key in req.body) {
		if (req.body[key] === "") delete req.body[key];
	}
	const game = new Game(req.body);
	game.save(function (err) {
		if (err) return res.send(err.message);
		res.redirect(`/games/${game._id}`);
	});
}

module.exports = {
	index,
	show,
	new: newGame,
	create,
};
