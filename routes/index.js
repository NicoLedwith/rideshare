var express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var User = require('../models/user');
var Ride = require('../models/ride');
var router = express.Router();
var rides = mongoose.model('ride', Ride);

router.get('/', function (req, res) {
    res.render('index', { user : req.user });
    console.log(req.user);
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
    console.log("POSTED register");
    User.register(new User({ username : req.body.username }), req.body.password, function(err, User) {
        if (err) {
          return res.render("register", {info: "Sorry. That username already exists. Try again."});
        }

        passport.authenticate('local')(req, res, function () {
            res.redirect('/');
        });
    });
});


router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/addride', function (req, res) {
    res.render('addride', {user: req.user, info: "info stuff"});
});

router.post('/addride', function(req, res){
    console.log("POSTED ADDRIDE");
    var rt;
    if (req.body.roundTrip)
        rt = true;
    else
        rt = false;
    console.log(req.user);
    var newRide = new Ride({
        user: req.user.username,
        destination: req.body.destination,
        availableSeats: req.body.availableSeats,
        roundTrip: rt,
        dateLeaving: req.body.dateLeaving,
        dateReturning: req.body.dateReturning,
        isActive: true
    });
    console.log("made newRide");
    console.log(newRide);
    newRide.save(function (err) {
        if(err){
            console.log(err);
            return res.render("addride", {info: "There was an error."});
        }
        res.render('addride', {user: req.user, info: "Ride added!"});
    });
    console.log("Ride saved");
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

module.exports = router;
