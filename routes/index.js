var express = require("express");
var router = express.Router();
const userModel = require("./users"); // requiring userModel
const passport = require("passport"); // requiring passport

// Adding these two lines
const localStrategry = require("passport-local");
passport.use(new localStrategry(userModel.authenticate()));

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});

router.post("/register", function (req, res, next) {
  const newUser = new userModel({
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  });

  userModel
    .register(newUser, req.body.password)
    .then(function (registeredUser) {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      });
    });
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/",
  }),
  function (req, res, next) {}
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/profile", isLoggedIn,async function (req, res, next) {
  let user = await userModel.findOne({username: req.session.passport.user})
  res.render("profile", {user});
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}

module.exports = router;
