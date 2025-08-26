if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}

// console.log(process.env.SECRET) // remove this after you've confirmed it is working

const express = require("express");
const app = express();

const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const mongoose = require("mongoose");

const ExpressError = require("./utiles/ExpressError");

const listingRouter = require("./routes/listings.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const session = require("express-session");
const MongoStore = require('connect-mongo'); //COMPATIABLE SESSION STORE
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

//setting views path
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//url encoded
app.use(express.urlencoded({ extended: true }));
//override
app.use(methodOverride("_method"));
//setting ejs-mate to acess ejs files
app.engine("ejs", ejsMate);
//stttng path to acess static files
app.use(express.static(path.join(__dirname, "/public")));

//establishing connection with database------------------------------------------------------------
//const MONGO_URL = "mongodb://127.0.0.1:27017/airBNB";
const dburl = process.env.ATLASDB_URL;

const store = MongoStore.create({             //store code for mongo-connect
  mongoUrl: dburl,
  crypto: {                                   //for additional security encryption 
    secret: process.env.SECRET,
  },
  touchAfter: 24 * 3600, //for lazy update 24 hrs
})

store.on("error", ()=>{
  console.log("ERROR IN MONGO SESSION", err);
})

const sessionOptions = {
  store,                        //passing store-------thereby through session 
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    //setting cookie option
    expries: Date.now() + 7 * 24 * 60 * 60 * 1000, //7 days conversion into milliseconds
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(session(sessionOptions));
app.use(flash()); //Note: we need to use flash before and routes are made in use R: we use sflash with the help of routes----we use flash before calling any routes

app.use(passport.initialize()); //initilizing passport
app.use(passport.session()); //for each session from user we gets multiple req, res----to make sure the session he is in
passport.use(new LocalStrategy(User.authenticate())); //using LocalStrategy-----authenticating user

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser()); //adds user and provide access thorugh out session
passport.deserializeUser(User.deserializeUser()); //after session expiry restricts access

//middelware---res.locals
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

//calling main f(x)
main()
  .then(() => {
    console.log("conection established with database");
  })
  .catch((err) => console.log(err));

//creating main f(x)
async function main() {
  console.log("DB connecting");
  await mongoose.connect(dburl);
}

// //check for testListing--------------------------- ---------------------------------------------
// app.get("/testListing", async(req,res)=>{
//     let sampleListing = new Listing({
//         title :"My New Home",
//         description: "Life close to beach",
//         image: "",
//         price: 1500,
//         location: "Vizag",
//         country: "India"
//     });
//     await sampleListing.save();
//     console.log('sample data saved');
//     res.send('sucessfully saved the data to DB');
// })

app.get("/error", async (req, res, next) => {
  next(new ExpressError(401, "status"));
  res.send("hi");
});

//define demoUser and registerUser
// app.get("/demoUser", async(req,res)=>{
//   let fakeUser = new User({
//     email: "careers.teja3@gmail.com",
//     username: "teja9",                         //teja9---note: in schmea usernaem is not defined but passport mongoose will add feilds for the same
//   });

//   let registeredUser = await User.register(fakeUser, "helloworld");   //static method to register user---with password "helloworld"
//   res.send(registeredUser);
// })

app.use("/listings", listingRouter); //single line instead of /listings route
app.use("/listings/:id/reviews", reviewRouter); //single line instead of /listings/:id/reviews  routes
app.use("/", userRouter);

// // // //Page not found handler for all routes when not matched above routed----eg: testing team reachout for the same
//NOT WORKING
// app.all("*",wrapAsync(async(req,res,next)=>{
//   next(new ExpressError(404,'Page not found!')) ;
// }));

app.use("/", (req, res, next) => {
  res.status(404).render("error/error.ejs", {
    err  });
});

//error-handler
app.use(async (err, req, res, next) => {
  let { status = 500, message = "default message" } = err;
  res.status(status).send(err);

  //res.send('something went wrong');
});

//check the root API--------------------------------------------------------------------------------
// app.use("/", (req, res) => {
//   res.send("hi this is root route");
// });

//starting server --------------------------------------------------------------------------------
app.listen("8080", () => {
  console.log("listening to the port 8080");
});
