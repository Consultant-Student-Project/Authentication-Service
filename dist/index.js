"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var App_1 = require("./App");
var port = process.env.PORT || 3000;
var connectionURL = '';
var app = new App_1.default(+port);
app.connectDB(connectionURL, {}, function () {
    app.start();
});
//# sourceMappingURL=index.js.map