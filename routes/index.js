const express = require("express");
const { tokenize, resolve } = require("../services/jwt");
const User = require("../modals/User");
const auth = require("../middlewares/auth");
const { validateSignUpForm } = require("../services/validation")


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
        });
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


router.post("/signup", function (req, res) {
    let formData = req.body;
    if (!validateSignUpForm(formData)) {
        return res.status(300).send("Bad Request!");
    }
    new User({
        username: formData.username,
        password: formData.password,
    });


});

module.exports = router;