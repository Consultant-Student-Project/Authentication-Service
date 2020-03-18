import * as express from 'express';
import Router from '../interfaces/Router'


export default class LoginRouter extends Router {

    constructor() {
        super();
        this.router = express.Router();
        this.router.post('/', this.signupHandler);
    }

    private signupHandler(req: express.Request, res: express.Response): any {

    }



}