const {getAll, addUser, login, deleteUser, updateUser} = require("../controllers/userController");
const {protectedRoutes} = require("../../utils/guardRoutes");
const router = require('express').Router();

router.get('/users',protectedRoutes, (req, res) => getAll(req, res));

router.post('/users/login', (req, res) => login(req, res))

router.post('/users/add', protectedRoutes,  (req, res) => addUser(req, res));

router.delete('/users/delete/:id', protectedRoutes, (req, res) => deleteUser(req, res))

router.put('/users/update/:id', protectedRoutes, (req, res) => updateUser(req, res))


module.exports = router;
