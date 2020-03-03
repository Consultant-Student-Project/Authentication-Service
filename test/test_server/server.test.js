const axios = require("axios").default;
const assert = require("chai").assert;
const { resolve, tokenize } = require("../../services/jwt");
const User = require("../../modals/User");


const fs = require("fs");
const path = require("path");
const serverAuthKey = fs.readFileSync(path.join(__dirname, "..", "..", "server2serverAuth.key")).toString();
const server = require("../../server");


describe("General server tests...", function () {
    this.timeout(8000);
    var testUserInfo = {
        username: "testuser12",
        password: "testuser12",
        email: "testuser12@gmail.com",
    }
    var address = "http://localhost:3000";
    var port = server.address().port;
    it("Delete if user exist", function (done) {
        User.deleteOne({ username: testUserInfo.username }, function (err) {
            done();
        });
    });
    it("Sending signup request...", function (done) {
        axios.post(`${address}/signup`, testUserInfo)
            .then(response => {
                if (response.status != 200) {
                    done("Response code : " + response.status);
                }
                done();
            }).catch(err => done(err));
    });

    it("Activating a user..", function (done) {
        tokenize(testUserInfo, function (err, token) {

            axios.post(`${address}/activate/${token}`)
                .then(response => {
                    if (response.status != 200) {
                        done("Response code : " + response.status);
                    }
                    done();
                }).catch(err => done(err));

        }, true);
    });
    var authToken = "";
    it("Sending login request...", function (done) {
        axios.post(`${address}/login`, {
            username: testUserInfo.username,
            password: testUserInfo.password,
        })
            .then(response => {
                if (response.status != 200) {
                    done("Response code : " + response.status);
                }
                done();
            }).catch(err => done(err));


    });

    it("Resolving an auth token..", function (done) {
        axios({
            method: "post",
            headers: {
                "x-server-auth-key": serverAuthKey,
            },
            url: `${address}/resolve`,
            data: {
                token: authToken,
            }
        }).then(response => {
            if (response.status != 200) {
                done("Response code : " + response.status);
            }
            done();
        }).catch(err => done(err));

    });
});

