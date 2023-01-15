const mongoose = require('mongoose')
const Schema = mongoose.Schema

const StudentSchema = Schema({
    name: String,
    level: String
})
module.exports = mongoose.model('Student',StudentSchema)
