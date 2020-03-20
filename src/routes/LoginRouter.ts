import * as express from 'express';
import Router from '../interfaces/Router';
import User from '../modals/User';
import JWTService from '../services/JWTService';

export default class LoginRouter extends Router {
    private jwt: JWTService;
    constructor() {
        super();
        this.jwt = new JWTService();
        this.router = express.Router();
        this.router.post('/', this.loginHandler);
    }

    public loginHandler = (req: express.Request, res: express.Response): any => {
        const username = req.body.username;
        const password = req.body.password;
        const self = this;
        User.findOne({ username }, function (err: Error, user: any) {
            if (err || !user) {
                return res
                    .status(300)
                    .send('User not found!');
            }
            user.isPasswordMatches(password, function (success) {
                if (!success) {
                    return res.status(300).send('Password is not correct');
                }
                self.jwt.tokenize(user, function (tokenizeError, token) {
                    res.send(token);
                });
            });
        });

    }

}