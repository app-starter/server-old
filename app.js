const express = require("express");
const session = require('express-session');

const db = require('./db');
const port = process.env.NODE_JS_PORT || 8080;
const bodyParser = require('body-parser');
const passport = require('passport');

const passportConfig = require('./config/passport');

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController = require('./controllers/user');
const roleController = require('./controllers/role');


app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds

}));
app.use(passport.initialize());


app.get("/", (req, res) => {
    res.send("Hello World")
});

app.post('/login', userController.postLogin);
app.post('/signup', userController.postSignup);
app.get('/getAllUser', passport.authenticate('jwt', { session: false }), userController.getAllUser);


app.post('/addRole', roleController.addRole);
app.get('/getAllRole', roleController.all);

app.get('/protected', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
});


app.listen(port, function () {
    console.log("listening on " + port + "!");
});
