const User = require('../models/user')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')
const jwt = require("jsonwebtoken");
const {secretAccessKey} = require("../../utils/keys");

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
            return res.json({msg: "Cet email existe dejq"});
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
            user.photo = avatar;
            console.log(user)
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err) throw err;
                    user.password = hash;
                    console.log(user);
                    user.save()
                        .then((user, err) =>{
                            if (err){
                                return  res.json({msg: "Echec de l'enregistrement"})
                            }
                            return res.json({msg: `L'utilisateur ${user.name} a été  ajouté`})
                        })
                        .catch(err => res.json({message: 'Echec de l\'enregistrement'}))
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
            return res.json({msg: "Cet utilisateur n'existe pas"});
        }
        console.log("je me log en base")
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                res.json( {msg: "bearer "+obtenirUntoken({id: user.id, name: user.name, email: user.email, role: user.role})})
            } else {
                return res.json({msg :"Le mot de passe est incorrect"});
            }
        });
    });
}

const obtenirUntoken = (user)=>{
    return jwt.sign(user, secretAccessKey,{
        expiresIn: 3600,
    })
}

const deleteUser = (req, res) => {
    console.log(req.params.id);
    User.findByIdAndRemove(req.params.id, (err, user) => {
        if(err){
            return res.json({ msg: "Cet utilisateur n'existe pas"})
        }
        res.json({
            msg: `l'utilisateur ${user.name} a été supprimé`
        })
    });

}

const updateUser = (req, res) => {
    console.log("UPDATE recu User : ");
    let user = {
        id: req.body.id,
        _id: req.body._id,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
        }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) throw err;
            if(user.password[0]!=='$'){
                user.password = hash;
            }

            User.findByIdAndUpdate(req.params.id,user, {new: true}, (err, user) => {
                if(err){
                    res.json({msg: 'impossible de mettre à jour cet utilisateur'})
                }
                res.json({msg: `l'utilisateur ${user.name} a été mis à jour`})
            })
        });
    });

}

module.exports = {addUser, getAll, getCurrentUser, login,deleteUser, updateUser}
