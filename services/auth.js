const path = require("path");
const fs = require("fs");
const serverAuthKey = fs.readFileSync(path.join(__dirname, "..", "server2serverAuth.key"));

function auth(req, res, next) {
    var authKey = req.headers["x-server-auth-key"];
    console.log(authKey, serverAuthKey);
    if (serverAuthKey != authKey) {
        res.status(301).send("Autherization Error!");
    }
    next();
}


module.exports = auth;