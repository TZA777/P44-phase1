const express = require('express');
const router = express.Router({mergeParams: true});

const Listing = require("../models/listings");
const Review = require("../models/reviews.js");

const wrapAsync = require("../utiles/wrapAsync.js");
const ExpressError = require("../utiles/ExpressError");

const {isLoggedin, validateReview, isAuthor}= require("../middelware.js");

const reviewController = require("../controllers/reviews.js");


router.route("/")
.get(reviewController.reviewRenderShow)       //review.get
.post(                                        //review.post
  isLoggedin,
  validateReview,
  wrapAsync(reviewController.createReview)
);



//delete Reviews Route
router.delete(
  "/:reviewId",
  isLoggedin,
  isAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports= router;