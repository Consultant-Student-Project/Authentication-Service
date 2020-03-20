const express = require("express");
const { tokenize, resolve } = require("../services/jwt");
const User = require("../modals/User");
const auth = require("../middlewares/auth");
const { validateSignUpForm } = require("../services/validation")
const { sendAccountActivationMail } = require("../services/mail");

var router = express.Router();

router.post("/login", function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username }, function (err, user) {
        if (err || !user) return res.status(300).send("User Not Found!");
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
    console.log(token);
    resolve(token, function (error, result) {
        if (error) {
            return setTimeout(function () {
                return res.status(300).send(err);
            }, 100);
        }
        return res.send(result);
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
        firstname: formData.firstname,
        lastname: formData.lastname,
    }).save(function (err, user) {
        if (err) {
            res.status(300).send("Server error");
        }
        sendAccountActivationMail(user, function (err, info) {
            if (err) {
                return res.status(300).send("Activision mail could not send");
            }
            res.send("Ok!");
        });
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
            console.log(`Account of ${username} is  Activated`);
            return res.send("Account Activated Correctly");
        });
    });

});

module.exports = router;