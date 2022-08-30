const mongoose = require('mongoose')
const Schema = mongoose.Schema

const gameSchema = new Schema({
	name: String,
	description: String,
	image: String,
	releaseYear: {
		type: Number,
		default: function () {
			return new Date().getFullYear()
		},
	},
})

module.exports = mongoose.model('Game', gameSchema)
