const jwt = require("jsonwebtoken");
const User = require("../assignment/models/user");
const {secretAccessKey} = require("./keys");
const isAuthorizedToDelete = (method, role) =>{
    return (method === "DELETE" && role.toLowerCase() === "classic");
}

 const protectedRoutes = (req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decodedtoken = jwt.verify(token, secretAccessKey);
            req.user = User.findById(decodedtoken.id).select('-password');
            if(isAuthorizedToDelete(req.method, decodedtoken.role)) return res.json({auth: "Attention vous n'êtes pas autoriés"})
            next();
        }catch (e) {
            res.json({auth: "Attention vous n'êtes pas autoriés"})
        }
    }
    if(!token){
        res.json({auth: "Attention vous n'êtes pas autoriés"})
    }
}

module.exports = { protectedRoutes}
