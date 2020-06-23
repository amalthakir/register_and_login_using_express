const mongoose = require("mongoose");

const PostSchema = mongoose.Schema({
    name: String,
    username: String,
    password: String,
    email: String
});

module.exports = mongoose.model('users', PostSchema);