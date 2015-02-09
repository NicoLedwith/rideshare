var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Ride = new Schema({
	user: String,
	destination: String,
	roundTrip: Boolean,
	dateLeaving: String,
	dateReturning: String 
});

Ride.plugin(passportLocalMongoose);

module.exports = mongoose.model('ride', Ride);