const Listing = require("../models/listings");

//geocoding
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding"); //reguire geocoding services
const mapToken = process.env.MAPBOX_TOKEN; //storing MAPBOX_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken }); //creating geocodingClient and providing access for the same

module.exports.index = async (req, res) => {
  // await Listing.find({}).then((res)=>{           //check
  //     console.log(res);
  // })

  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewRoute = (req, res) => {
  //console.log(req.user); //in req user details are stored which helps in further authentication

  //isAuthenticated() logic passed as middelware--isLoggedin
  res.render("listings/new.ejs");
};

module.exports.createRouter = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  console.log(response.body.features[0].geometry);   // coordinates we need---{ type: 'Point', coordinates: [ 77.20877, 28.613928 ] }
  // res.send("done!");

  let url = req.file.path;
  let filename = req.file.filename;
  let data = req.body.listing;

  //using exiting obj we are saving data into an variable and updataing to DB using .save()
  let newListing = new Listing(data);
  newListing.image = { url, filename }; //before saving updating url and filename extracted from req.file into newListing.image

  newListing.owner = req.user._id; //adding owner details to listing before saving ---req.user contails all user details so in owner we are adding ._id

 
  newListing.geometry = response.body.features[0].geometry; //storing coordinates into newListing
  let newUpdatedListing = await newListing.save();
  console.log(newUpdatedListing);

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditRouter = async (req, res, next) => {
  //res.send("edit route");

  let { id } = req.params;
  let listing = await Listing.findById(id);
  //console.log(listing);

  // throw err;
  //next(new ExpressError(401,'This is an error with statusCode=401')) ;

  if (!listing) {
    req.flash("error", "Listing you requested do not exit");
    return res.redirect("/login");
  }

  //to check logged in--middelware isLoggedin

  //adjusting image size and quality in edit page
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_350"); //updating image and storing in itself

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateRouter = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }); //here we are deconstruct form req.body and updating the same using findbyId and update()
  //note: if we console listing--it returns old document
  // R: By default, Mongoose’s update methods (findByIdAndUpdate, findOneAndUpdate, etc.) return the document as it was before the update, not after.
  // to return updated doc incule {new: true} along with  (id, {...req.body.listing }, {new: true})

  // check and requite url and filename and save()
  if (typeof req.file != undefined) {
    let url = req.file.path;
    let filename = req.file.filename;

    listing.image = { filename, url };
    await listing.save();
  }

  req.flash("success", "Listing updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyRoute = async (req, res) => {
  let { id } = req.params;

  //to check logged in--middelware isLoggedin

  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);

  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};

module.exports.renderShowRoute = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner"); //while populating review we are populating autor
  //console.log(listing);

  //console.log(await listing.owner);

  if (!listing) {
    req.flash("error", "Listing you requested do not exit");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};
