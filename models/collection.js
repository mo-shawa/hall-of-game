const mongoose = require('mongoose');

const collectionSchema = new mongoose.Schema({
    description: {
        type: String,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item',
    }]
});


module.exports = mongoose.model('Collection', collectionSchema);