const Game = require("../models/game");
const Item = require("../models/item");

function index(req, res) {
	Item.find({}, function (err, items) {
		res.render("items/index", { items });
	});
}

function show(req, res) {
	Item.findById(req.params.id, function (err, item) {
		Game.findById(item.game, function (err, game) {
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
	for (let key in req.body) {
		if (req.body[key] === "") delete req.body[key];
	}
	// Add game id based on Url path
	req.body.game = req.params.g_id;
	// Save item into db
	const item = new Item(req.body);

	item.save(function (err) {
		Game.findById(req.params.g_id, function (err, game) {
			if (err) return res.send(err.message);
			console.log(game);
			res.render("items/view", { item, game });
		});
	});
}

function editItem(req, res) {
	Item.findById(req.params.id, function (err, item) {
		if (err) return res.send(err.message);
		res.render("items/edit", { item });
	});
}

function deleteItem(req, res) {
	Item.findByIdAndDelete(req.params.id, function (err) {
		// if (err) return res.send(err.message);
		res.redirect("/items");
	});
}

function update(req, res) {
	Item.findByIdAndUpdate(req.params.id, req.body, function (err, item) {
		if (err) return res.send(err.message);
		res.redirect(`/items/${item._id}`);
	});
}

function catShow(req, res) {
	Item.find({ category: req.params.cat })
		.populate("game")
		.exec(function (err, items) {
			if (err) return res.send(err.message);
			res.render(`items/categories/view`, { items, cat: req.params.cat });
		});
}

module.exports = {
	index,
	show,
	new: newItem,
	create,
	edit: editItem,
	update,
	delete: deleteItem,
	catShow,
};
