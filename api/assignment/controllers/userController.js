const User = require('../models/user')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')
const jwt = require("jsonwebtoken");

const getAll = (req, res) =>{
    User.find((err, user) => {
        if (err){
            res.send(err);
        }
        res.send(user);
    })
}

const addUser = (req, res) => {
    console.log("je fais un post")
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.json({msg: "Email already exists"});
        } else {
            const avatar = gravatar.url(req.body.email, {
                s: 200, // Size
                r: "pg", // Rating
                d: "mm", // Default
            });

            const user = new User();
            user.id = req.body.id;
            user.name = req.body.name;
            user.email = req.body.email;
            user.password = req.body.password;
            user.role  = req.body.role;
            user.photo = req.body.photo !== "" ? req.body.photo: avatar;
            console.log(user)
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then((user, err) =>{
                            if (err){
                                return  res.json({msg: "failled to save the user"})
                            }
                            return res.json({token: obtenirUntoken({id: user.id, name: user.name, email: user.email, role: user.role})})
                        })
                        .catch(err => res.json({message: 'Sorry there is a problem to save the user'}))
                });
            });
        }
    });


}

const getCurrentUser = (req, res) => {
    res.json({
        id : res.id,
        name: res.name,
        email: res.email,
        role : res.role,
        photo: res.photo
    })
}

const login = (req, res) => {
    let email = req.body.email;
    console.log(email)
    let password = req.body.password;
    User.findOne({ email }).then((user) => {
        console.log(user)
        if (!user) {
            return res.json({msg: "User not found"});
        }
        console.log("je me log en base")
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                res.json( "Bearer "+obtenirUntoken({id: user.id, name: user.name, email: user.email, role: user.role}))
            } else {
                return res.json({msg :"Password incorrect"});
            }
        });
    });
}

const obtenirUntoken = (user)=>{
    return jwt.sign(user, "ilovemymum",{
        expiresIn: 3600,
    })
}

const protectedRequest = (req, res, next) =>{
    console.log(req.headers.authorization)
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedtoken = jwt.verify(token, "ilovemymum");
            req.user = User.findById(decodedtoken.id).select('-password');

            next();
        }catch (e) {
                res.json({msg: "Attention vous n'etes pas autorise"})
        }
    }
    if(!token){
        res.json({msg: "Attention vous n'etes pas autorise"})
    }
}

module.exports = {addUser, getAll, getCurrentUser, login, protectedRequest}
