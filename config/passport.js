import passport from "passport";
import { ErrorHandler } from "../middleware/error-handler";
import { User } from "../models";

const { Strategy: LocalStrategy } = require("passport-local");
var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "PUB_KEY",
  algorithms: ["HS256"],
};

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

/**
 * Sign in using Email and Password.
 */
passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(
          new ErrorHandler(401, "Something is wrong!", [
            { msg: `Email ${email} not found.` },
          ])
        );
      }
      if (!user.password) {
        return done(
          new ErrorHandler(
            401,
            "Your account was registered using a sign-in provider",
            [
              {
                msg:
                  "Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.",
              },
            ]
          )
        );
      }
      user.comparePassword(password, (err, isMatch) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(null, user);
        }
        return done(
          new ErrorHandler(401, "Invalid email or password.", [
            {
              msg: "Invalid email or password.",
            },
          ])
        );
      });
    });
  })
);

passport.use(
  new JwtStrategy(options, function (jwt_payload, done) {
    User.findOne({ _id: jwt_payload.sub }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "198158015305-dugl206e3s31qfa3v7s9fl32msdt2tl8.apps.googleusercontent.com",
      clientSecret: "2z_v1y8suPjWM4Nz3uWz8f3-",
      callbackURL: "http://localhost:8070/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      console.log(profile);
      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          currentUser.profile.name = profile.displayName;
          (currentUser.email = profile._json.email),
            currentUser.save((err) => {
              if (err) {
                done(err, null);
              }
              done(null, currentUser);
            });
        } else {
          //if not, create a new user
          new User({
            googleId: profile.id,
            email: profile._json.email,
            role: "Member",
          })
            .save()
            .then((newUser) => {
              done(null, newUser);
            });
        }
      });
    }
  )
);

export default passport;
