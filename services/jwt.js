const jwt = require("jsonwebtoken");
const path = require("path");
const jwtPrivateKey = require("fs").readFileSync(path.join(__dirname, "..", "jwtPrivate.key"));

const jwtOptions = {

}

function tokenize(user, cb, activationToken = false) {
    jwt.sign({ username: user.username, isActivationToken: activationToken }, jwtPrivateKey, jwtOptions, cb);
}

function resolve(token, cb) {
    jwt.verify(token, jwtPrivateKey, cb);
}



module.exports = {
    tokenize,
    resolve,
}
