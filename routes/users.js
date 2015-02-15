var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');
var Ride = require('../models/ride');
var router = express.Router();
var rides = mongoose.model('ride', Ride);

router.get('/:username', function(req, res, next) {
  var username = req.params.username;
  User.findOne({username: username}, function (err, users) {
    Ride.find({username: username}, function (err, rides) {
      console.log(users);
      res.render('users', {
        user: users,
        rides: rides
      });    
    });
  });
});
