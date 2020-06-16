const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    date: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
})

module.exports = mongoose.model('Posts', PostSchema)