const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: String,
    email: String
})

mongoose.model('User', UserSchema);