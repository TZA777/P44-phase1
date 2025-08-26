const mongoose = require("mongoose");
const data = require("./data.js");
const Listing = require("../models/listings.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/airBNB";

main()
  .then(() => {
    console.log("connected to database");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  data.data = data.data.map((obj) => ({
    ...obj,
    owner: "68a46bd1d00fbc3bd41a99c2",
  }));
  await Listing.insertMany(data.data);
  console.log("data was initilized");
};

initDB();
