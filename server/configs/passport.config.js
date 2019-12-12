const User = require("../models/User");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const passport = require("passport");

passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => next(null, user))
    .catch(next);
});

passport.use(
  new LocalStrategy(
    {
      // by default, local strategy uses username and password, we will override with email
      usernameField: "email",
      passwordField: "password",
      passReqToCallback: true // allows us to pass back the entire request to the callback
    },
    (req, email, password, next) => {
      User.findOne({ email }, (err, foundUser) => {
        if (err) {
          next(err);
          return;
        }

        if (!foundUser) {
          next(null, false, { message: "Usuario no registrado." });
          return;
        }

        if (!bcrypt.compareSync(password, foundUser.password)) {
          next(null, false, { message: "Contraseña incorrecta." });
          return;
        }

        next(null, foundUser);
      });
    }
  )
);
