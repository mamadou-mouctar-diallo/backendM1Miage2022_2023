const {getAssignments, postAssignment, deleteAssignment, updateAssignment} = require("../controllers/assigmnentController");
const passport = require('passport');
const router = require('express').Router();

router.get('/assignments', (req, res) => getAssignments(req, res));

router.post('/assignments/add', (req, res) => postAssignment(req, res));

router.delete('/asignments/delete', (req, res) => deleteAssignment(req, res));

router.put('/assignments/update/:id',(req, res) => updateAssignment(req, res));


module.exports = router;
