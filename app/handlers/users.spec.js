/**
 * @author Fathi Jemli <jemlifathi2013@gmail.com>
 */
const axios = require('axios');

const API_URL = 'http://localhost:4000' + '/api/v1/users/login';

describe('Users handler', function () {
    describe('Login', function (done) {
        it('Should return a 200, 403 or 404 status code', function (done) {
            axios.get(API_URL).then(function (response) {
                expect(response.status).toBe(200);
            }, function (err) {
                expect([404, 403]).toContain(err.status);
            });
            done();
        });
    });

    describe('Login', function (done) {
        it('Should return a 200 or 403 status code', function (done) {
            axios.get(API_URL).then(function (response) {
                expect(response.status).toBe(200);
            }, function (err) {
                expect(err.status).toBe(403);
            });
            done();
        });
    });
});