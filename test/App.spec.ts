import App from '../src/App'
import { expect } from 'chai'
import User from '../src/modals/User'
import JWTService from '../src/services/JWTService';
import * as baseAxios from 'axios';
import 'mocha'

const axios = baseAxios.default;

describe('General App Test.',
    function () {

        let jwt = new JWTService();

        this.timeout(3000);

        const testUserInfo = {
            username: 'testuser12',
            password: 'testuser12',
            email: 'testuser12@gmail.com',
            firstname: 'test',
            lastname: 'user',
        };
        var address = 'http://localhost:3000';
        var app: App;
        it('Invoke express application.',
            (done: MochaDone) => {
                let port = 3000;
                app = new App(+port);
                let databaseConnectionURL = 'mongodb://localhost:27017/ConsultantStudentProject';
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

                axios.post(`${address}/activate/`, { token: token })
                    .then(response => {
                        expect(response.status).to.equals(200);
                        done();
                    }).catch(err => done(err));

            }, true);
        });
        var authToken = '';
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