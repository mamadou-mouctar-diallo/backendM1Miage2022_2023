const {getAssignments, postAssignment, deleteAssignment, updateAssignment} = require("../controllers/assigmnentController");
const {protectedRoutes} = require("../../utils/guardRoutes");
const router = require('express').Router();

router.get('/assignments', (req, res) => getAssignments(req, res));

router.post('/assignments/add',protectedRoutes, (req, res) => postAssignment(req, res));

router.delete('/assignments/delete/:id',protectedRoutes, (req, res) => deleteAssignment(req, res));

router.put('/assignments/update/:id',protectedRoutes, (req, res) => updateAssignment(req, res));


module.exports = router;
