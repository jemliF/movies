const axios = require('axios');

const API_URL = 'http://localhost:' + process.env.APP_PORT + '/api/v1/movies';

describe('Movies handler', function () {
    describe('Get a single movie', function (done) {
        it('Should return a 200 or 404 status code', function (done) {
            axios.get(API_URL).then(function (response) {
                //expect([200, 404]).toContain(response.status);
                expect(response.status).toBe(200);
            });
            done();
        });
    });
});