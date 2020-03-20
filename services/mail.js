const mailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const { tokenize } = require("../services/jwt");
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

function sendAccountActivationMail(user, cb) {
    tokenize(user,
        function (error, token) {
            transporter.sendMail({
                from: user,
                to: user.email,
                subject: "Account Activision.",
                html: `Activate your account. <a href="http://localhost:3000/activate/${token}" ></a>`,
            }, cb);
        }, true);
}

function sendMessage(message, to, cb) {
    transporter.sendMail({
        from: user,
        to: to,
        subject: "Test Message",
        text: message,
    }, cb)
}

module.exports = { sendAccountActivationMail, sendMessage }