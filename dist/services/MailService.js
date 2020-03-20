"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var fs = require("fs");
var nodemailer = require("nodemailer");
var MailService = /** @class */ (function () {
    function MailService(service) {
        if (service === void 0) { service = 'gmail'; }
        this.transporter = nodemailer.createTransport();
        var res;
        try {
            res = fs.readFileSync(path.join(__dirname, '..', '..', 'emailinfo.csv')).toString();
        }
        catch (e) {
            res = 'thatsmail@doesnotexist.com,passwordnotexist';
        }
        var sarr = res.split(',');
        this.username = sarr[0];
        this.password = sarr[1];
    }
    MailService.prototype.sendAccountActivationMail = function (user, cb) {
        this.jwt.tokenize(user, function (error, token) {
            this.transporter.sendMail({
                from: user,
                to: user.email,
                subject: "Account Activision.",
                html: "Activate your account. <a href=\"http://localhost:3000/activate/" + token + "\" ></a>",
            }, cb);
        }, true);
    };
    MailService.prototype.sendMessage = function (message, to, cb) {
        this.transporter.sendMail({
            from: this.username,
            to: to,
            subject: "Test Message",
            text: message,
        }, cb);
    };
    return MailService;
}());
exports.default = MailService;
//# sourceMappingURL=MailService.js.map