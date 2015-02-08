var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Ride = new Schema({
	destination: String,
	roundTrip: Boolean,
	dateLeaveing: { type: Date},
	dateReturning: String 
});

Ride.plugin(passportLocalMongoose);

module.exports = mongoose.model('ride', Ride);