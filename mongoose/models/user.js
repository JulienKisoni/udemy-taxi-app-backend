const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String },
    email: { type: String },
    picture: { type: String }
});

module.exports = mongoose.model('Users', UserSchema);