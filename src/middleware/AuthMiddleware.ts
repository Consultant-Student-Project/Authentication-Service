import Middleware from '../interfaces/Middleware';
import * as express from 'express';


export default class AuthMiddleware extends Middleware {

    private privateKey: string;

    constructor() {
        super();
        // Read private key from root
        this.privateKey = process.env.SERVER_AUTH_KEY || 'default_key';
    }
    public instance = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        // Get authentication token from request's header
        const requestKey = req.headers['x-server-auth-key'];
        // if it's not equal return error
        if (requestKey !== this.privateKey) {
            return res.status(301).send('Authentication Failed');
        }
        // otherwise continue to process properly
        next();
    }

}