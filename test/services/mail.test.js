const request = require("request");
const chai = require("chai");
const assert = chai.assert;

describe("Mail service tests...", function () {

    var sendMessage;
    it("Mail service initialized correctly...", function (done) {
        this.timeout(3000);
        sendMessage = require("../../services/mail").sendMessage;
        done();
    });

    it("Mail service sent mail properly...", function (done) {
        const testEmail = "consultantstudentproject@gmail.com";
        sendMessage("Test Message", "Test Message From", testEmail, function (err, info) {
            if (err) {
                assert(true, "Error occured when sending email")
                done(err);
            }
            done();
        });
    });

});

