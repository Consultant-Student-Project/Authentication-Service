const express = require("express");
const { tokenize, resolve } = require("../services/jwt");
const User = require("../modals/User");

var router = express.Router();

router.post("/login", function (req, res) {
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username }, function (err, user) {
        console.log(user);
        if (err) return res.status(300).send("Bad Request1");
        user.isPasswordMatches(password, function (success) {
            if (!success) return res.status(300).send("Bad Request 2");
            tokenize(user, function (err, token) {
                res.send(token);
            });

        })


    });

});


router.post("/resolve", function (req, res) {

});


module.exports = router;