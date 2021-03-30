import express from "express";
import session from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import morgan from "morgan";
import errorHandler from "errorhandler";
import CONNECTIONSTRING from "./config/db";
import routers from "./routers";
import passport from "./config/passport";
import seedData from "./config/seed";

//Configure mongoose's promise to global promise
mongoose.promise = global.Promise;

const port = process.env.NODE_JS_PORT || 8080;
const isProduction = process.env.NODE_ENV === "production";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET,
    cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  })
);

if (!isProduction) {
  app.use(errorHandler());
}

//Configure Mongoose
mongoose.connect(CONNECTIONSTRING);
mongoose.set("debug", true);
mongoose.set('useCreateIndex', true);

seedData();

app.use(routers);

//Error handlers & middlewares
if (!isProduction) {
  app.use((err, req, res) => {
    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err,
      },
    });
  });
}

app.use((err, req, res) => {
  res.status(err.status || 500);

  res.json({
    errors: {
      message: err.message,
      error: {},
    },
  });
});

app.listen(port, function () {
  console.log("listening on " + port + "!");
});
