const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
	{
		text: {
			type: String,
		},
		creator: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		rating: {
			type: Number,
			min: 1,
			max: 5,
		},
		modelID: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: 'onModel',
		},
		onModel: {
			type: String,
			required: true,
			enum: ['Item', 'Collection', 'Game'],
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Comment', commentSchema)
