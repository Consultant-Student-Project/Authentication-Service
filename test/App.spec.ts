import App from '../src/App';
import { expect } from 'chai';
import User from '../src/modals/User';
import JWTService from '../src/services/JWTService';
import testUserInfo from './testUser';
import * as baseAxios from 'axios';
import 'mocha';

const axios = baseAxios.default;

describe('General App Test.',
    function () {

        const jwt = new JWTService();

        this.timeout(3000);

        const address = 'http://localhost:3000';
        let app: App;
        it('Invoke express application.',
            (done: MochaDone) => {
                const port = 3000;
                app = new App(+port);
                const databaseConnectionURL = 'mongodb://localhost:27017/ConsultantStudentProject';
                app.connectDB(databaseConnectionURL, {}, () => {
                    app.start();
                    done();
                });
            });


        it('Delete if user exist', function (done) {
            User.deleteOne({ username: testUserInfo.username }, function (err) {
                done();
            });
        });
        it('Sending signup request...', function (done) {
            axios.post(`${address}/signup`, testUserInfo)
                .then(response => {
                    expect(response.status).to.equals(200);
                    done();
                }).catch(err => done(err));
        });

        it('Activating a user..', function (done) {
            jwt.tokenize(testUserInfo, function (err, token) {

                axios.post(`${address}/activate/`, { token })
                    .then(response => {
                        expect(response.status).to.equals(200);
                        done();
                    }).catch(requestError => done(requestError));

            }, true);
        });

        it('Sending login request...', function (done) {
            axios.post(`${address}/login`, {
                username: testUserInfo.username,
                password: testUserInfo.password,
            })
                .then(response => {
                    expect(response.status).to.equals(200);
                    done();
                }).catch(err => done(err));


        });


        it('Close app...', function (done: MochaDone) {
            app.server.close((err) => {
                expect(err).to.equals(undefined);
                done();
            });
        });


    });