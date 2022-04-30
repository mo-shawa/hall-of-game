const Game = require("../models/game");
const Item = require("../models/item");
const Comment = require("../models/comment");

function index(req, res) {
	Game.find({}, function (err, games) {
		res.render("games/index", { games });
	});
}

async function show(req, res) {

	// Item.find({ game: req.params.id })
	// 	.populate("game").exec(function (err, items) {
	// 		if (err) return res.send(err.message);
	// 		res.render('games/view', { items });
	// 	});
	const comments = await Comment.find({ modelID: req.params.id, onModel: "Game" })
	console.log(comments)

	let rating = comments.reduce((acc, curr) => {
		return acc + curr.rating;
	}, 3);
	rating = rating / (comments.length + 1);

	Game.findById(req.params.id, function (err, game) {
		Item.find({ game: game._id }, function (err, items) {
			res.render("games/view", { game, items, comments, rating });
		});
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

const createComment = async (req, res) => {
	req.body.modelID = req.params.id;
	req.body.onModel = "Game";
	const comment = await new Comment(req.body);
	console.log(comment)
	await comment.save();
	res.redirect(`/games/${req.params.id}`);


}

module.exports = {
	index,
	show,
	new: newGame,
	create,
	createComment
};
