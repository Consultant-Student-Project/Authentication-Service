import * as express from 'express';
import Router from '../interfaces/Router';
import JWTService from '../services/JWTService';
import User from '../modals/User';
import * as _ from 'lodash';


export default class ApproveRouter extends Router {

  private jwt: JWTService;

  constructor() {
    super();
    this.jwt = new JWTService();
    this.router = express.Router();
    this.router.get('/', this.handler);
  }

  public handler = (req: express.Request, res: express.Response): any => {
    const token = req.header('X-Auth-Token');
    const self = this;
    self.jwt.resolve(token, (err: Error, result: any) => {
      if (err) {
        console.log('Err', err);
        return res
          .status(300)
          .send('Token not resolved');
      }
      User.findOne({ username: result.username })
        .then(user => {
          return res
            .send(_.pick(user,
              ['username',
                'lastname',
                'firstname',
                'password',
                'email',
                'isActive',
                'authorization',
                'faculty',
                'department']));
        })
        .catch();


    });
  }

}