import * as express from 'express';
import Router from '../interfaces/Router';
import AuthMiddleware from '../middleware/AuthMiddleware';
import JWTService from '../services/JWTService';

import { MiddlewareFunction } from '../interfaces/functionTypes';


export default class ResolveRouter extends Router {
    private auth: MiddlewareFunction;
    private jwt: JWTService;
    constructor() {
        super();
        this.jwt = new JWTService();
        this.auth = new AuthMiddleware().instance;
        this.router = express.Router();
        this.router.post('/', this.auth, this.resolveHandler);
    }

    private resolveHandler = (req: express.Request, res: express.Response): any => {
        const self = this;
        const token = req.body.token;

        self.jwt.resolve(token, function (err: Error, result: any) {
            if (err) {
                return res
                    .status(500)
                    .send('Token not resolved');
            }
            return res.send(result);
        });


    }



}