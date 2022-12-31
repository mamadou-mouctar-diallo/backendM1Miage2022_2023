let express = require('express');
let app = express();
let bodyParser = require('body-parser');
const mongodbURI = require('./api/utils/keys').mongodbURI
let assignment = require('./api/assignment/routes/routesAssignment');
let user = require('./api/assignment/routes/routesUser');
const passport = require("passport")

let mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//mongoose.set('debug', true);



const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
mongoose.set('strictQuery', false);
mongoose
    .connect(mongodbURI, options)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

app.use(passport.initialize());

// Pour accepter les connexions cross-domain (CORS)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

let port = process.env.PORT || 8015;

// les routes
const prefix = '/api';

require('./api/utils/passport')(passport);

//Route pour les assignments

app.use(prefix, assignment)

//Route pour les utilisateurs

app.use(prefix, user)

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;


