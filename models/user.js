var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var coords = {};

var User = new Schema({
    username: String,
    password: String,
    hometown: coords
});

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', User);