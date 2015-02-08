var express = require('express');
var passport = require('passport');
var User = require('../models/user');
var router = express.Router();


router.get('/', function (req, res) {
    res.render('index', { user : req.user });
});

router.get('/register', function(req, res) {
    res.render('register', { });
});

router.post('/register', function(req, res) {
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
    var newRide = new Ride({
        destination: req.body.destination,
        roundTrip: true,
        dateLeaving: req.body.dateLeaving,
        dateReturning: req.body.dateReturning
    });
    newRide.save(function (err) {
        if(err){
            return res.render("addride", {info: "There was an error."});
        }

        return res.render("addride", {info: "Ride added!"});
    });
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});

module.exports = router;
