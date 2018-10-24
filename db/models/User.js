const mongoose = require('mongoose');

const User = mongoose.model('User', {
    oauthID: Number,
    name: String,
    created: Date
});

module.exports = User;
