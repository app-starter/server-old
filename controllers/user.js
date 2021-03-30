import express from "express";
import validator from "validator";
import passport from "passport";
import {User} from "../models";
import utils from "../utils/util";

export const userController = {
  postLogin: (req, res, next) => {
    const validationErrors = [];
    if (
      !validator.isEmail(req.body.email) ||
      validator.isEmpty(req.body.password)
    )
      validationErrors.push({ msg: "Incorrect username or password." });

    if (validationErrors.length) {
      res.status(401).send(validationErrors);
      return;
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        res.send(info);
        return;
      }
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        const tokenObject = utils.issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      });
    })(req, res, next);
  },
  postSignup: (req, res, next) => {
    const validationErrors = [];
    if (!validator.isEmail(req.body.email))
      validationErrors.push({ msg: "Please enter a valid email address." });
    if (!validator.isLength(req.body.password, { min: 8 }))
      validationErrors.push({
        msg: "Password must be at least 8 characters long",
      });
    if (req.body.password !== req.body.confirmPassword)
      validationErrors.push({ msg: "Passwords do not match" });

    if (validationErrors.length) {
      res.send(validationErrors);
      return;
    }
    req.body.email = validator.normalizeEmail(req.body.email, {
      gmail_remove_dots: false,
    });

    const user = new User({
      email: req.body.email,
      password: req.body.password,
      role: "Member",
    });

    User.findOne({ email: req.body.email }, (err, existingUser) => {
      if (err) {
        return next(err);
      }
      if (existingUser) {
        res.send({ msg: "Account with that email address already exists." });
        return;
      }
      user.save((err) => {
        if (err) {
          return next(err);
        }
        req.logIn(user, (err) => {
          if (err) {
            return next(err);
          }
          res.send({ msg: "Success! You are logged in." });
        });
      });
    });
  },
  getAllUser: (req, res) => {
    User.find({}, (err, users) => {
      var userMap = {};

      users.forEach(function (user) {
        userMap[user._id] = user;
      });
      res.send(userMap);
    }).populate("Role");
  },
};
