const express = require("express");
const router = express.Router();

const User = require("../models/user"); //requiring userSchema
const wrapAsync = require("../utiles/wrapAsync");
const passport = require("passport");

const { saveRedirectUrl } = require("../middelware");
const userController = require("../controllers/users");

router.route("/signup")
.get(userController.renderSignup)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLogin)
.post(
  saveRedirectUrl, //passing middelware to save destined location
  passport.authenticate("local", {
    //authentication process-handeled by passport-local
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.login //actual login logic is taken care by passport----in userController.login we code for after login procedure
);

router.get("/logout", userController.logout);

module.exports = router;
