const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    displayName: {
        type: String,
        // required: true,
        unique: true
    },
    avatar: {
        type: String,
    },
    googleID: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    collections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Collection'
    }],
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],


});

module.exports = mongoose.model('User', userSchema);



