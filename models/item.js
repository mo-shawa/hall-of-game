const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
	name: String,
	description: String,
	category: {
		type: String,
		enum: ['Weapon', 'Character', 'Map', 'Item'],
	},
	image: String,
	game: {
		type: Schema.Types.ObjectId,
		ref: 'Game',
	},
})

module.exports = mongoose.model('Item', itemSchema)
