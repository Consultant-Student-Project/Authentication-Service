import 'mocha'
import { expect } from 'chai'

import JWTService from '../../src/services/JWTService'

describe('JSON Web Token test.',
    function () {

        let jwt = new JWTService();

        let exampleObject = {
            username: 'Test',
            password: 'testpass'
        };

        let token: string;
        it('Tokenize an object', (done) => {
            jwt.tokenize(exampleObject, (err: Error, result: any) => {
                if (err) {
                    return done(err);
                }
                token = result;
                done();
            }, false);
        });


        it('Resolve a token', (done) => {
            jwt.resolve(token, (err: Error, result: any) => {
                if (err) {
                    return done(err);
                }
                expect(result.username).to.be.equals(exampleObject.username);
                done();
            });
        })






    }
);