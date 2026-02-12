const mongoose = require('mongoose');
const data = require('./data.js');                          //data
const Listing = require('../models/listings.js');           //model


//establishing connection with database------------------------------------------------
const MONGO_URL= "mongodb://127.0.0.1:27017/airBNB";      

//calling main f(x)
main().then(()=>{
    console.log('connected to database');
}).catch(err => console.log(err));

//creating main f(x)
async function main(){
    await mongoose.connect(MONGO_URL);
}


//creating a f(x) to delete all exiting data and inserting data from data.js------------
const initDB = async ()=>{
    await Listing.deleteMany({});
    data.data= data.data.map((obj)=>({...obj,owner:'68a46bd1d00fbc3bd41a99c2'}));  //adding owner using ref ID---before addding to Listing
    await Listing.insertMany(data.data);  //we are requiring data from data.js as an object so we use data.data
    console.log('data was initilized');
}

//calling initDB f(x)
initDB();

//ADDING OWNER---we are using map on existing .data and creating a new array----saving the same data in same variable ie,. data.data



