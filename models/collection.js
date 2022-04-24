const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }
});


module.exports = mongoose.model('Collection', collectionSchema);