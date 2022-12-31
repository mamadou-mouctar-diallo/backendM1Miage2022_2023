let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    id: String,
    name: String,
    deadLine: Date,
    rendered: Boolean,
    author: String,
    course: {
        name: String,
        coursePhoto: String,
        teacherPhoto: String
    },
    mark: Number,
    comment: String
});

// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model('Assignment', AssignmentSchema);
