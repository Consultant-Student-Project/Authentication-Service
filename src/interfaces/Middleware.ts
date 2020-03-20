import * as express from 'express';

export default class Middleware {
    public instance: (req: express.Request, res: express.Response, next: express.NextFunction) => any;
}