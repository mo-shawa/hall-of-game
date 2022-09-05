const Game = require('../models/game')
const Item = require('../models/item')
const Comment = require('../models/comment')
const User = require('../models/user')

async function index(req, res) {
	const games = await Game.find({})
	res.render('games/index', { games })
}

async function show(req, res) {
	const comments = await Comment.find({
		modelID: req.params.id,
		onModel: 'Game',
	})

	const rating =
		comments.reduce((acc, curr) => (acc + curr.rating) / comments.length, 0) /
		comments.length
	const game = await Game.findById(req.params.id)
	console.log(game)
	const items = await Item.find({ game: game._id })
	res.render('games/view', { game, items, comments, rating })
}

function newGame(req, res) {
	res.render('games/new')
}

async function create(req, res) {
	for (let key in req.body) {
		if (req.body[key] === '') delete req.body[key]
	}
	const game = new Game(req.body)
	await game.save()
	res.redirect(`/games/${game._id}`)
}

const createComment = async (req, res) => {
	console.log('HERE----------')
	req.body.modelID = req.params.id
	req.body.onModel = 'Game'
	console.log(req.body)
	const comment = await new Comment(req.body)
	console.log(comment)
	await comment.save()
	res.redirect(`/games/${req.params.id}`)
}

module.exports = {
	index,
	show,
	new: newGame,
	create,
	createComment,
}
