"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("jsonwebtoken");
var fs = require("fs");
var path = require("path");
var JWTService = /** @class */ (function () {
    function JWTService(options) {
        if (options === void 0) { options = {}; }
        //Reading private key from root
        this.privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'jwtPrivateKey.key')).toString();
        this.options = options;
    }
    JWTService.prototype.tokenize = function (user, cb, activationToken) {
        if (activationToken === void 0) { activationToken = false; }
        jwt.sign({ username: user.username, isActivationToken: activationToken }, this.privateKey, this.options, cb);
    };
    JWTService.prototype.resolve = function (token, cb) {
        jwt.verify(token, this.privateKey, cb);
    };
    return JWTService;
}());
exports.default = JWTService;
//# sourceMappingURL=JWTService.js.map