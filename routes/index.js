const express = require("express");
const { tokenize, resolve } = require("../services/jwt");
const User = require("../modals/User");
const auth = require("../services/auth");



var router = express.Router();

router.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username }, function (err, user) {
        console.log(user);
        if (err) return res.status(300).send("User Not Found!");
        user.isPasswordMatches(password, function (success) {
            if (!success) return res.status(300).send("Password is not correct");
            tokenize(user, function (err, token) {
                res.send(token);
            });

        })


    });

});

router.post("/resolve", auth, function (req, res) {
    let token = req.body["token"];
    resolve(token, function (error, result) {
        if (error) {

        }
        res.send(result);
    });
});


module.exports = router;