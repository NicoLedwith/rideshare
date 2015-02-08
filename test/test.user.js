var should = require("should");
var mongoose = require('mongoose');
var User = require("../models/user.js");
var db;

describe('User', function() {

    before(function(done) {
        db = mongoose.connect('mongodb://localhost/test');
            done();
    });

    after(function(done) {
        mongoose.connection.close();
        done();
    });

    beforeEach(function(done) {
        var User = new User({
            username: '12345',
            password: 'testy'
        });

        User.save(function(error) {
            if (error) console.log('error' + error.message);
            else console.log('no error');
            done();
        });
    });

    it('find a user by username', function(done) {
        User.findOne({ username: '12345' }, function(err, User) {
            User.username.should.eql('12345');
            console.log("   username: ", User.username);
            done();
        });
    });

    afterEach(function(done) {
        User.remove({}, function() {
            done();
        });
     });

});