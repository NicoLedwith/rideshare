var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Ride = new Schema({
	username: String,
	destination: String,
	availableSeats: Number,
	roundTrip: Boolean,
	dateLeaving: Date,
	dateReturning: Date,
	isActive: Boolean 
});

Ride.plugin(passportLocalMongoose);

module.exports = mongoose.model('ride', Ride);