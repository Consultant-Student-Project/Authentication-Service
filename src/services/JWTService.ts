import * as jwt from 'jsonwebtoken';

class JWTService {
    private privateKey: string;
    private options: object;
    constructor(options: object = {}) {
        this.privateKey = process.env.JWT_PRIVATE_KEY || 'default_jwt_private_key';
        this.options = options;
    }

    public tokenize(user: any, cb: (err: Error, result: any) => any, activationToken: boolean = false) {
        jwt.sign({
            username: user.username,
            authorization: user.authorization,
            isActivationToken: activationToken
        },
            this.privateKey,
            this.options, cb);
    }

    public resolve(token: string, cb: (err: Error, result: any) => any) {
        jwt.verify(token, this.privateKey, cb);
    }

}

export default JWTService;