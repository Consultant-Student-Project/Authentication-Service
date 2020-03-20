"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var LoginRouter_1 = require("./LoginRouter");
var ResolveRouter_1 = require("./ResolveRouter");
var SignUpRouter_1 = require("./SignUpRouter");
var ActivateRouter_1 = require("./ActivateRouter");
var express = require("express");
var router = express.Router();
router.use('/login', new LoginRouter_1.default().router);
router.use('/activate', new ActivateRouter_1.default().router);
router.use('/signup', new SignUpRouter_1.default().router);
router.use('/resolve', new ResolveRouter_1.default().router);
exports.default = router;
//# sourceMappingURL=index.js.map