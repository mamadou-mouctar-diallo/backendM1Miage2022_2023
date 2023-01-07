const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema =Schema({
    id: String,
    name: String,
    email: String,
    password: String,
    role: String,
    photo: String

})

module.exports = mongoose.model('User', UserSchema);
