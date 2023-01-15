const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CourseSchema = Schema({
    name: String,
    coursePhoto: String,
    teacherPhoto: String
})
module.exports = mongoose.model('Course',CourseSchema)
