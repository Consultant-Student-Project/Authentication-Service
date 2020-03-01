const jwt = require("jsonwebtoken");
const path = require("path");
const jwtPrivateKey = require("fs").readFileSync(path.join(__dirname, "..", "jwtPrivate.key"));
console.log("JWT TOKEN IS:" + jwtPrivateKey);

const jwtOptions = {

}

function tokenize(user, cb) {
    jwt.sign({ username: user.username }, jwtPrivateKey, jwtOptions, cb);
}

function resolve(token, cb) {
    jwt.verify(token, jwtPrivateKey, cb);
}



module.exports = {
    tokenize,
    resolve,
}