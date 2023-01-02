
const passport = require('passport');
const {getAll, addUser, login, protectedRequest} = require("../controllers/userController");
const router = require('express').Router();

router.get('/users', (req, res) => getAll(req, res));

router.post('/users/login', (req, res) => login(req, res))

router.post('/users/add',  (req, res) => addUser(req, res));


module.exports = router;
