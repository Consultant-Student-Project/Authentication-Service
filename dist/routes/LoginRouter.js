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
var LoginRouter = /** @class */ (function (_super) {
    __extends(LoginRouter, _super);
    function LoginRouter() {
        var _this = _super.call(this) || this;
        _this.router = express.Router();
        _this.router.post('/', _this.loginHandler);
        return _this;
    }
    LoginRouter.prototype.loginHandler = function (req, res) {
        res.send('Hello from activation');
    };
    return LoginRouter;
}(Router_1.default));
exports.default = LoginRouter;
//# sourceMappingURL=LoginRouter.js.map