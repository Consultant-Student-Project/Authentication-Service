"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var Router_1 = require("../interfaces/Router");
var MailService_1 = require("../services/MailService");
var ValidationService_1 = require("../services/ValidationService");
var User_1 = require("../modals/User");
var SignUpRouter = /** @class */ (function (_super) {
    __extends(SignUpRouter, _super);
    function SignUpRouter() {
        var _this = _super.call(this) || this;
        _this.validator = new ValidationService_1.default();
        _this.mailService = new MailService_1.default();
        _this.router = express.Router();
        _this.router.post('/', _this.signupHandler);
        return _this;
    }
    SignUpRouter.prototype.signupHandler = function (req, res) {
        var _this = this;
        //Get form data
        var formData = req.body;
        //Check formdata is valid or not
        if (!this.validator.validate(formData)) {
            return res.status(300).send('Bad Request');
        }
        //Create an user.
        new User_1.default(formData).save(function (err, user) {
            if (err) {
                return res.status(500).send('Error  : creating error on saving user');
            }
            //Send activation mail
            _this.mailService.sendAccountActivationMail(user, function (err, info) {
                if (err) {
                    return res
                        .status(300)
                        .send('Activation mail can not send');
                }
                return res
                    .send('Ok!');
            });
        });
    };
    return SignUpRouter;
}(Router_1.default));
exports.default = SignUpRouter;
//# sourceMappingURL=SignUpRouter.js.map