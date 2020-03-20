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
var Middleware_1 = require("../interfaces/Middleware");
var fs = require("fs");
var path = require("path");
var AuthMiddleware = /** @class */ (function (_super) {
    __extends(AuthMiddleware, _super);
    function AuthMiddleware() {
        var _this = _super.call(this) || this;
        _this.instance = function (req, res, next) {
            //Get authentication token from request's header
            var requestKey = req.headers['x-server-auth-key'];
            //if it's not equal return error
            if (requestKey != _this.privateKey) {
                return res.status(301).send('Authentication Failed');
            }
            //otherwise continue to process properly
            next();
        };
        //Read private key from root
        _this.privateKey = fs.readFileSync(path.join(__dirname, '..', '..', 'server2serverAuth.key')).toString();
        return _this;
    }
    return AuthMiddleware;
}(Middleware_1.default));
exports.default = AuthMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map