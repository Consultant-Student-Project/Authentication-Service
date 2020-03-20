import Middleware from '../interfaces/Middleware'
import * as express from 'express'


export default class TimeoutMiddleware extends Middleware {

    private timeoutMilliSecond: number;

    constructor(timeout: number = 3000) {
        super();
        this.timeoutMilliSecond = timeout;
    }
    public instance = (
        req: express.Request,
        res: express.Response,
        next: express.NextFunction) => {

        req.setTimeout(this.timeoutMilliSecond);
        next();

    }
}