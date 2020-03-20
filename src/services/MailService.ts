import * as path from 'path';
import * as fs from 'fs';

import * as nodemailer from 'nodemailer';

import JWTService from './JWTService';

export default class MailService {
    private transporter: nodemailer.Transporter;
    private jwt: JWTService;
    public username: string;
    private password: string;

    constructor(service: string = 'gmail') {
        let res: string;
        res = fs.readFileSync(path.join(__dirname, '..', '..', 'emailinfo.csv')).toString();
        const sarr = res.split(',');
        this.username = sarr[0];
        this.password = sarr[1];
        this.transporter = nodemailer.createTransport({
            service,
            auth: {
                user: this.username,
                pass: this.password,
            }
        });
        this.jwt = new JWTService();
    }

    public sendAccountActivationMail =
        (user: any, cb: (err: Error, info: any) => void) => {
            this.jwt.tokenize(user,
                function (error: Error, token: string) {
                    if (error) {
                        console.log('An error occured ad1');
                        return cb(error, null);
                    }
                    this.transporter.sendMail({
                        from: user,
                        to: user.email,
                        subject: 'Account Activision.',
                        html: `Activate your account.
                            <a href="http://localhost:3000/activate/${token}" >
                         </a>`,
                    }, cb);
                }, true);
        }

    public sendMessage = (
        message: string,
        to: string,
        cb: (err: Error, info: any) => void) => {
        this.transporter.sendMail({
            from: this.username,
            to,
            subject: 'Test Message',
            text: message,
        }, cb);
    }




}