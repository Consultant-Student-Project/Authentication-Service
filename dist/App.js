"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var routes_1 = require("./routes");
var App = /** @class */ (function () {
    function App(port) {
        this.express = express();
        this.port = port;
        this.express.use('/', routes_1.default);
    }
    App.prototype.connectDB = function (connectionURL, options, cb) {
        if (options === void 0) { options = null; }
        mongoose.connect(connectionURL, options, function (err) {
            if (err) {
                return console.error('Error occured when connecting to db ');
            }
            console.log('Connected to db correctly');
            return cb();
        });
    };
    App.prototype.start = function () {
        var _this = this;
        this.server = this.express.listen(this.port, function () {
            console.log(_this.port + " is listening...");
        });
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=App.js.map