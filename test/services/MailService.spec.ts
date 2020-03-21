import 'mocha';
import { expect } from 'chai';

import MailService from '../../src/services/MailService';
import testUserInfo from '../testUser';
import User from '../../src/modals/User';

describe('Mail Service Test.',
    function () {

        this.timeout(6000);

        let mailer: MailService;

        it('Create mail service correctly.', (done) => {
            mailer = new MailService();
            done();
        });

        it('Send a mail to target mail address', (done) => {
            const to = mailer.username;
            mailer.sendMessage('Hello from MailService test.', to, (err: Error, info: any) => {
                if (err) {
                    return done(err);
                }
                done();
            })
        });

        it('Send an activation token to an user', (done) => {
            User.findOne({ username: testUserInfo.username }, (err: Error, user: any) => {
                if (err) {
                    done(err);
                }
                console.log('user found');
                mailer.sendAccountActivationMail(user, (err: Error, info: any) => {
                    if (err) {
                        done(err)
                    }
                    done();
                });
            })
        });


    }
);