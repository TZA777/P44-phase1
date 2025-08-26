const User = require("../models/user")

module.exports.renderSignup = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signup = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    const newUser = new User({ username, email }); //creating newUser using User schema
    const registeredUser = await User.register(newUser, password); //registering newUser with password extracted
    console.log(registeredUser);

    //to automate login after signup
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "welcome to AIRBNB");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message); //if user is already registered ---it displays that message
    res.redirect("/listings");
  }
};

module.exports.renderLogin = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.login = async (req, res) => {
  req.flash("success", "Logged in, Welcome to AIRBNB");
  //console.log(req.body); //user details

  const redirectUrl = res.locals.redirectUrl || "/listings";
  //console.log(redirectUrl);
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    //passport-local method
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};


