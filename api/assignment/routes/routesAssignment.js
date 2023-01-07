const {getAssignments, postAssignment, deleteAssignment, updateAssignment} = require("../controllers/assigmnentController");
const {protectedRequest} = require("../controllers/userController");
const router = require('express').Router();

router.get('/assignments', (req, res) => getAssignments(req, res));

router.post('/assignments/add',protectedRequest, (req, res) => postAssignment(req, res));

router.delete('/asignments/delete/:id',protectedRequest, (req, res) => deleteAssignment(req, res));

router.put('/assignments/update/:id',protectedRequest, (req, res) => updateAssignment(req, res));


module.exports = router;
