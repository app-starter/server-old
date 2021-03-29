import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import db from "./db";
import passport from "passport";
import passportConfig from "./config/passport";
import cors from 'cors';
import {
  roleController,
  permissionController,
  userController,
} from "./controllers";

const port = process.env.NODE_JS_PORT || 8080;

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  })
);
app.use(passport.initialize());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/login", userController.postLogin);
app.post("/signup", userController.postSignup);
app.get(
  "/getAllUser",
  passport.authenticate("jwt", { session: false }),
  userController.getAllUser
);

app.post("/addRole", roleController.addRole);
app.post("/updateRole", roleController.updateRole);
app.get("/getAllRole", roleController.all);

app.get("/getAllPermission", permissionController.all);

app.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res
      .status(200)
      .json({
        success: true,
        msg: "jwt You are successfully authenticated to this route!",
      });
  }
);

app.listen(port, function () {
  console.log("listening on " + port + "!");
});
