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
        email: formData.email,
    }).save(function (err, user) {
        if (err) {
            res.status(300).send("Server error");
        }
        res.send("Ok!");
    });
});

router.post("/activate/:token", function (req, res) {
    let token = req.params.token;
    resolve(token, function (err, decoded) {
        if (err || !decoded.isActivationToken) {
            return res.status(500).send("Error occured when resolving a token")
        }
        let username = decoded.username;
        User.updateOne({ username: username }, { isActive: true }, function (err, doc) {
            if (err) {
                return res.status(500).send("Bad request");
            }
            return res.send("Account Activated Correctly");
        });
    });

});

module.exports = router;