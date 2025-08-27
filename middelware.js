const Listing = require("./models/listings");
const Review = require("./models/reviews");
const { listingSchema, reviewSchema } = require("./joiSchema");
const ExpressError = require("./utiles/ExpressError");

module.exports.isLoggedin = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in");
    return res.redirect("/login");
  }
  next();
};

module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not owner of listing, action denied");
    return res.redirect(`/listings/${id}`);
  }

  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log("err found in server validation");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body, { convert: true });

  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    console.log("err found in server validation");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);

  if (!review.author._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not author of review, action denied");
    return res.redirect(`/listings/${id}`);
  }

  next();
};
