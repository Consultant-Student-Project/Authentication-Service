const request = require("request");
const assert = require("assert");
const { resolve, tokenize } = require("../../services/jwt");
const User = require("../../modals/User");
describe("JWT service tests...", function () {
    const testUser = {
        username: "testUserName",
        password: "testUserPassword",
        email: "testUserEmail@mail.com"
    }

    var testToken;
    var testDecoded;

    it("Tokenize correctly...", function (done) {
        tokenize(testUser, function (err, token) {
            if (err) {
                assert(true, "Error occured on tokenizing....")
            }
            testToken = token;
            done();
        })
    });

    it("Resolve Token correctly... ", function (done) {
        resolve(testToken, function (err, decoded) {
            if (err) {
                assert(true, "Error occured on resolving....");
                done(err);
            }
            testDecoded = decoded;
            done();
        });
    });

    it("Decoded data matches originial data", function (done) {
        const isEqual = testDecoded.username == testUser.username;
        assert.equal(isEqual, true, "Decoded data doesn't matches original one");
        done();
    });


});

