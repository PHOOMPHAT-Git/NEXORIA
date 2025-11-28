const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    password: String,
    gmail: String,
    updated_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', UserSchema)