import Middleware from '../interfaces/Middleware'
import * as express from 'express'
import * as fs from 'fs'
import * as path from 'path'

export default class AuthMiddleware extends Middleware {

    private privateKey: string;

    constructor() {
        super();
        //Read private key from root
        this.privateKey = fs.readFileSync(path.join('..', '..', 'server2serverAuth.key')).toString();
    }
    public instance = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        //Get authentication token from request's header
        let requestKey = req.headers['x-server-auth-key'];
        //if it's not equal return error
        if (requestKey != this.privateKey) {
            return res.status(301).send('Authentication Failed');
        }
        //otherwise continue to process properly
        next();
    }

}