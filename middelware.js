
const Listing = require("./models/listings");
const Review = require("./models/reviews");
const {listingSchema, reviewSchema} = require("./joiSchema");
const ExpressError = require("./utiles/ExpressError");

module.exports.isLoggedin = (req,res, next)=>{
    
    //console.log(req.path, ".......", req.originalUrl);
    //console.log(req.body);

    
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;        //saving req.originalUrl before logging in 
        req.flash("error", "You must be logged in");
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req, res, next) =>{
    if(req.session.redirectUrl){                                 //EDGE CASE: if req.session.redirectUrl exist then 
        //console.log(req.session.redirectlUrl);                   //check----undefined--R: right after log in session is set to undefined
        res.locals.redirectUrl = req.session.redirectUrl;
        //console.log(res.locals.redirectUrl);       //saving in local for the reason, Passport after loggin in will set session value to undefined
    }
    next();
};
//originalUrl----->save before login @req.session.redirectUrl----->after Login----->redirect accordingly after login

module.exports.isOwner = async(req, res, next)=>{
    let {id} = req.params;           //in edit, update and delete routes id is available in params      
    let listing = await Listing.findById(id);
    //console.log(listing);
    //console.log(res.locals.currUser);

    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash('error','You are not owner of listing, action denied');
        return res.redirect(`/listings/${id}`);
    }

    next();
};


module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);                //listingSchema is joi schema
  //console.log(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(","); //to print error message
    console.log("err found in server validation");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};


module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body, { convert: true });
  //console.log(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(","); //to print error message
    console.log("err found in server validation");
    throw new ExpressError(404, errMsg);
  } else {
    next();
  }
};


module.exports.isAuthor = async(req, res, next)=>{
    let {id, reviewId} = req.params;           //in edit, update and delete routes id is available in params      
    let review = await Review.findById(reviewId);
    //console.log(listing);
    //console.log(res.locals.currUser);

    if(!review.author._id.equals(res.locals.currUser._id)){
        req.flash('error','You are not author of review, action denied');
        return res.redirect(`/listings/${id}`);                //show route
    }

    next();
};


