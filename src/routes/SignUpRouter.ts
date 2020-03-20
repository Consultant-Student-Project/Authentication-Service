import * as express from 'express';
import Router from '../interfaces/Router';

import { SignUpFormData } from '../interfaces/formTypes';
import MailService from '../services/MailService';
import ValidatorService from '../services/ValidationService';
import User from '../modals/User';

export default class SignUpRouter extends Router {
    private validator: ValidatorService;
    private mailService: MailService;
    constructor() {
        super();
        this.validator = new ValidatorService();
        this.mailService = new MailService();
        this.router = express.Router();
        this.router.post('/', this.signupHandler);
    }

    signupHandler = (req: express.Request, res: express.Response) => {
        // Get form data
        const formData: SignUpFormData = req.body;
        // Check formdata is valid or not
        if (!this.validator.validate(formData)) {
            return res.status(300).send('Bad Request');
        }
        // Create an user.
        new User(formData).save((err: Error, user: any) => {
            if (err) {
                return res
                    .status(500)
                    .send('Error  : creating error on saving user');
            }
            process.nextTick(() => {
                // Send activation mail
                this.mailService.sendAccountActivationMail(user,
                    (mailError: Error, info: any) => {
                        if (mailError) {
                            // TODO: log mail sending
                        }
                    }
                );
            });
            return res.send('Ok!');
        });



    }



}