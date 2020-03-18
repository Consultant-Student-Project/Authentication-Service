import * as path from 'path'
import * as fs from 'fs'

import * as nodemailer from 'nodemailer'

import JWTService from './JWTService'

class MailService {
    private transporter: nodemailer.Transporter;
    private jwt: JWTService;
    public username: string;
    private password: string;

    constructor(service: string = 'gmail') {
        this.transporter = nodemailer.createTransport()
        let res: string;
        try {
            res = fs.readFileSync(path.join('..', '..', 'emailinfo.csv')).toString();
        } catch (e) {
            res = 'thatsmail@doesnotexist.com,passwordnotexist';
        }
        let sarr = res.split(',');
        this.username = sarr[0];
        this.password = sarr[1];
    }

    public sendAccountActivationMail(user: any, cb: (err: Error, info: any) => void) {
        this.jwt.tokenize(user,
            function (error: Error, token: string) {
                this.transporter.sendMail({
                    from: user,
                    to: user.email,
                    subject: "Account Activision.",
                    html: `Activate your account. <a href="http://localhost:3000/activate/${token}" ></a>`,
                }, cb);
            }, true);
    }

    public sendMessage(message: string, to: string, cb: (err: Error, info: any) => void) {
        this.transporter.sendMail({
            from: this.username,
            to: to,
            subject: "Test Message",
            text: message,
        }, cb)
    }




}