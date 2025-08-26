const Listing = require("../models/listings");
const Review = require("../models/reviews");


module.exports.reviewRenderShow = async(req,res)=>{
 // console.log(await req.body);
  res.render("listings/show.ejs");
}

module.exports.createReview= async (req, res) => {
    console.log(req.params.id);
    let listing = await Listing.findById(req.params.id); //extracting listing as per id from params
    let newReview = new Review(req.body.review); //exptracting obj created in show route
    //console.log(listing);
    //console.log(newReview);

    newReview.author = req.user._id;  //saving currentUser id into author

    await listing.review.push(newReview); //pusing newReview into array

    await newReview.save(); //save newReview into reviews
    await listing.save(); //save updated listing
    // console.log(listing);

    console.log("new review saved");
    //res.send('new review saved');

    req.flash("success", "New review saved");
    res.redirect(`/listings/${listing.id}`); //redirecting to show route
  }

  module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    console.log(id, reviewId);

    await Listing.findByIdAndUpdate(id, {$pull: {review: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    req.flash("success", "Reveiw deleted");
    res.redirect(`/listings/${id}`);
  }