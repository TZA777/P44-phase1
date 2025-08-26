const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const passportLocalMongoose = require("passport-local-mongoose");

//userSchema------------Note: passport-local-mongoose will by default add username, password and their hashed , salted form-------no need to create from scratch
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    }

});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);