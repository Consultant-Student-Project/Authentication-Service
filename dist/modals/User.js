"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
var SALT_WORK_FACTOR = 10;
var userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        }
    },
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: false,
    }
});
userSchema.pre("save", function (next) {
    var user = this;
    if (!user.isModified('password'))
        return next();
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err)
            return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            user.password = hash;
            next();
        });
    });
});
userSchema.methods.isPasswordMatches = function (passwd, callback) {
    var user = this;
    bcrypt.compare(passwd, user.password, function (err, isMatch) {
        if (err)
            return callback(false);
        callback(isMatch);
    });
};
var User = mongoose.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=User.js.map