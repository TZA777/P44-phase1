const express = require("express");
const router = express.Router();

const Listing = require("../models/listings");
const Review = require("../models/reviews.js");
const User = require("../models/user.js");

const wrapAsync = require("../utiles/wrapAsync.js");
const ExpressError = require("../utiles/ExpressError");

const { isLoggedin, isOwner, validateListing } = require("../middelware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage }); //{ dest: 'uploads/' }  //an uploads folder is automatically created to save image files

router
  .route("/")
  .get(wrapAsync(listingController.index)) //Index route
  .post(
    isLoggedin,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.createRouter)
  ); //Create route

//check
// .post(upload.single('listing[image][url]'),(req,res)=>{  //passing it as middelware---in above post route
//   res.send(req.file);
// });

router.get("/new", isLoggedin, listingController.renderNewRoute); //New route

router
  .route("/:id")
  .put(
    //update route
    isLoggedin,
    isOwner,
    upload.single("listing[image][url]"),
    validateListing,
    wrapAsync(listingController.updateRouter)
  )
  .delete(isLoggedin, isOwner, listingController.destroyRoute) //destroy route
  .get(listingController.renderShowRoute); //show route

router.get(
  //edit route
  "/:id/edit",
  isLoggedin,
  isOwner,
  wrapAsync(listingController.renderEditRouter)
);

module.exports = router;
