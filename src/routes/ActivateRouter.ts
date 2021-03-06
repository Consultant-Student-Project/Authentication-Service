import * as express from 'express';
import Router from '../interfaces/Router';
import JWTService from '../services/JWTService';
import User from '../modals/User';

export default class ActivateRouter extends Router {

    private jwt: JWTService;

    constructor() {
        super();
        this.jwt = new JWTService();
        this.router = express.Router();
        this.router.post('/', this.activateHandler);
    }

    public activateHandler = (req: express.Request, res: express.Response): any => {
        const token = req.body.token;
        const self = this;

        self.jwt.resolve(token, (err: Error, result: any) => {
            if (err || !result.isActivationToken) {
                return res
                    .status(300)
                    .send('Token not resolved');
            }
            User.updateOne({ username: result.username }, { isActive: true }, (updateErr: Error, user: any) => {
                if (updateErr) {
                    return res
                        .status(300)
                        .send('User not found.');
                }
                return res.send('Ok!');
            });
        });
    }

}