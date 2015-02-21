var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var datejs = require('datejs');
var User = require('../models/user');
var Ride = require('../models/ride');
var router = express.Router();
var rides = mongoose.model('ride', Ride);
// var gmaps = require('gmaps');
// var mapsapi = require('google-maps-api')('AIzaSyBeOvkAX6ZcPTCYoOVV_QDzuGuyyyunEvc');

router.get('/maptest', function (req, res) {
        var Lrides = rides.find({}, function(err, data) { 
        //console.log(err, data, data.length);
        //console.log(data);
        res.render('maptest', {
            user: req.user,
            rides: data
        });
    });
});

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
    console.log(req.user);
    console.log(__dirname);
});

router.get('/register', function(req, res) {
    res.render('register', { });
});


router.post('/register', function(req, res) {
    console.log("POSTED register");
    var ht = {};
    // if (req.body.hometown)
    //         maps.geocode({
    //             'address': ht,
    //             callback: function(results, status){
    //                 if(status == 'OK'){
    //                     var loc = results[0];
    //                     // ht = results[0].geometry.location.lat(), results[0].geometry.location.lng();
    //                 console.log(ht);
    //                 };
    //             }
    //         });
    //     });
    
    User.register(new User({ username : req.body.username,
        hometown: ht }),
        req.body.password, function(err, User) {
            if (err) {
              return res.render("register", {info: "Sorry. That username already exists. Try again."});
            }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user,});
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/addride', function (req, res) {
    res.render('addride', {user: req.user});
});

router.post('/addride', function(req, res){    
    console.log(req.body);
    var rt;
    if (req.body.roundTrip)
        rt = true;
    else
        rt = false;
    var dr = "";
    if (req.body.dateReturning)
        dr = Date.parse(req.body.dateReturning).toString("dddd MMM dS, h:mmt");

    var newRide = new Ride({
        username: req.user.username,
        destination: req.body.destination,
        availableSeats: req.body.availableSeats,
        roundTrip: rt,
        dateLeaving: [req.body.dateLeaving, Date.parse(req.body.dateLeaving).toString("dddd MMM dS, h:mmt")],
        dateReturning: [req.body.dateReturning, dr],
        isActive: true
    });

    newRide.save(function (err) {
        if(err){
            console.log(err);
            return res.render('addride', {info: "There was an error."});
        }
        res.render('addride', {user: req.user, info: "Ride added!"});
    });
});

router.get('/ridelist', function (req, res) {
    var Lrides = rides.find({}, function(err, data) { 
        //console.log(err, data, data.length);
        //console.log(data);
        res.render('ridelist', {
            user: req.user,
            rides: data
        });
    });
});

router.get('/users/:username', function(req, res, next) {
  var username = req.params.username;
  User.findOne({username: username}, function (err, users) {
    Ride.find({username: username}, function (err, rides) {
      console.log(users);
      res.render('users', {
        user: users,
        rides: rides,
      });    
    });
  });
});

router.get('/users/:username/:rideid', function (req, res, next) {
    var username = req.params.username;
    var rideid = req.params.rideid;
    console.log(username);
    console.log(rideid);
    User.findOne({username: username}, function (err, users) {
        Ride.findOne({_id: rideid}, function (err, rides) {
          // console.log(users);
          // console.log(rides);
          res.render('ride', {
            user: users,
            ride: rides,
          });    
        });
      });
});

router.post('/users/:username/:rideid', function(req, res) {
    console.log("updating");
    var username = req.params.username;
    console.log(username);
    var rideid = req.params.rideid;
    var dr = "";
    if (req.body.dateReturning)
        dr = Date.parse(req.body.dateReturning).toString("dddd MMM dS, h:mmt");
    Ride.findByIdAndUpdate(rideid,
                          {$set: {
                                destination: req.body.destination,
                                availableSeats: req.body.availableSeats,
                                roundTrip: req.body.roundTrip,
                                dateLeaving: [req.body.dateLeaving, Date.parse(req.body.dateLeaving).toString("dddd MMM dS, h:mmt")],
                                dateReturning: [req.body.dateReturning, dr]}
                          },
                        function (err, docs) {
                            res.redirect(/users/+username);         
                    });
    
});

module.exports = router;
