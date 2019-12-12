const express = require("express");
const passport = require("passport");
const router = express.Router();
const User = require("../../models/User");
const uploader = require("../../configs/cloudinary.config");

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

router.post("/signup", (req, res, next) => {
  const { name, surname, email, password, picture } = req.body;

  if (!email || !name || !surname || !password) {
    res
      .status(400)
      .json({
        message: "Nombre, Apellido, Email y Contraseña son obligatorios"
      });
    return;
  }

  if (password.length < 2) {
    res
      .status(400)
      .json({
        message: "Seleccione una contraseña mayor de 8 caracteres, por favor"
      });
    return;
  }

  User.findOne({ email }, (err, foundUser) => {
    console.log(foundUser);
    if (err) {
      res.status(500).json({ message: "Username check went bad." });
      return;
    }

    if (foundUser) {
      res
        .status(400)
        .json({ message: "Email ya en uso, por favor seleccione otro" });
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      surname,
      email,
      password: hashPass,
      picture
    });

    newUser.save(err => {
      if (err) {
        console.log(err);
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      // Automatically log in user after sign up
      // .login() here is actually predefined passport method
      req.login(newUser, err => {
        if (err) {
          res.status(500).json({ message: "Login after signup went bad." });
          return;
        }

        // Send the user's information to the frontend
        // We can use also: res.status(200).json(req.user);
        res.status(200).json(newUser);
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    // save user in session
    req.login(theUser, err => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }
      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

router.post("/logout", (req, res, next) => {
  // req.logout() is defined by passport
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

router.post("/upload", uploader.single("picture"), (req, res) => {
  console.log(req.file);
  if (req.file) {
    res.status(200).json({ secure_url: req.file.secure_url });
  } else {
    res.status(500).json({ message: "Something went wrong" });
  }
});

// //Social-Login: GOOGLE
// router.get('/auth/google',
//   passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login'] }));

// // GET /auth/google/callback
// //   Use passport.authenticate() as route middleware to authenticate the
// //   request.  If authentication fails, the user will be redirected back to the
// //   login page.  Otherwise, the primary route function function will be called,
// //   which, in this example, will redirect the user to the home page.
// router.get('/auth/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });

module.exports = router;
