const mailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

var accoutarr = fs.readFileSync(path.join(__dirname, "..", "emailInfo.csv")).toString().split(",");
const user = accoutarr[0];
const pass = accoutarr[1];

const transporter = mailer.createTransport({
    service: "gmail",
    auth: {
        user: user,
        pass: pass,
    }
});

function sendAccountActivationMail(user) {

}

function sendMessage(message, to) {

}

module.exports = { sendAccountActivationMail, sendMessage }