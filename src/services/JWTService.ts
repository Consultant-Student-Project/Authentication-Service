import * as jwt from 'jsonwebtoken'
import * as fs from 'fs'
import * as path from 'path'


class JWTService {
    private privateKey: string;
    private options: Object;
    constructor(options: Object = {}) {
        //Reading private key from root
        this.privateKey = fs.readFileSync(path.join('..', '..', 'jwtPrivateKey.key')).toString();
        this.options = options;
    }

    public tokenize(user: any, cb: (err: Error, result: any) => any, activationToken: Boolean = false) {
        jwt.sign({ username: user.username, isActivationToken: activationToken }, this.privateKey, this.options, cb);
    }

    public resolve(token: string, cb: (err: Error, result: any) => any) {
        jwt.verify(token, this.privateKey, cb);
    }

}

export default JWTService