const Listing = require("../models/listings");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding"); //reguire geocoding services
const mapToken = process.env.MAPBOX_TOKEN; //storing MAPBOX_TOKEN
const geocodingClient = mbxGeocoding({ accessToken: mapToken }); //creating geocodingClient and providing access for the same

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewRoute = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.createRouter = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();
  console.log(response.body.features[0].geometry);

  let url = req.file.path;
  let filename = req.file.filename;
  let data = req.body.listing;

  let newListing = new Listing(data);
  newListing.image = { url, filename };

  newListing.owner = req.user._id;

  newListing.geometry = response.body.features[0].geometry;
  let newUpdatedListing = await newListing.save();
  console.log(newUpdatedListing);

  req.flash("success", "New Listing Created");
  res.redirect("/listings");
};

module.exports.renderEditRouter = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);

  if (!listing) {
    req.flash("error", "Listing you requested do not exit");
    return res.redirect("/login");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_350"); //updating image and storing in itself

  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateRouter = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
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

  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);

  req.flash("success", "Listing deleted");
  res.redirect("/listings");
};

module.exports.renderShowRoute = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id)
    .populate({ path: "review", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requested do not exit");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};
