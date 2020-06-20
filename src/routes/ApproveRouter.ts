import * as express from 'express';
import Router from '../interfaces/Router';
import JWTService from '../services/JWTService';
import User from '../modals/User';

export default class ApproveRouter extends Router {

  private jwt: JWTService;

  constructor() {
    super();
    this.jwt = new JWTService();
    this.router = express.Router();
    this.router.post('/', this.handler);
  }

  public handler = (req: express.Request, res: express.Response): any => {
    const token = req.header('X-Auth-Token');
    const username = req.body.username;
    const self = this;
    self.jwt.resolve(token, (err: Error, result: any) => {
      if (err) {
        console.log('Err', err);
        return res
          .status(300)
          .send('Token not resolved');
      }
      // if user is not autherized to approve
      console.log(result.auhorization);
      if (result.auhorization < 3) {
        return res
          .status(300)
          .send('Autherization error');
      }
      User.updateOne({ username, }, { authorization: 2 }, (updateErr: Error, user: any) => {
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