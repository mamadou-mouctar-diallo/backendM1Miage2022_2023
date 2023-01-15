const {addStudent, getStudents, addCourse, getCourses} = require("../controllers/utilController");
const router = require('express').Router();

router.post('students', (req, res) => addStudent(req, res))

router.get('students', (req, res) => getStudents(req, res))

router.post('courses', (req, res) => addCourse(req, res))

router.get('courses', (req, res) => getCourses(req, res))


module.exports = router
