
const passport = require('passport');
const {getAll, addUser, login, protectedRequest, deleteUser, updateUser} = require("../controllers/userController");
const router = require('express').Router();

router.get('/users',protectedRequest, (req, res) => getAll(req, res));

router.post('/users/login', (req, res) => login(req, res))

router.post('/users/add', protectedRequest,  (req, res) => addUser(req, res));

router.delete('users/delete/:id', protectedRequest, (req, res) => deleteUser(req, res))

router.put('users/update/:id', protectedRequest, (req, res) => updateUser(req, res))


module.exports = router;
