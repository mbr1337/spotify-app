// 2 integrated tests
const request = require('supertest');
const { authRouter, getAccessToken } = require('../auth');
const app = require('../index');


describe('Auth Endpoints', () => {
    test('GET /login should return a 302 status code', async () => {
        const response = await request(app).get('/auth/login');
        expect(response.statusCode).toBe(302);
    });

    test('GET /token should return the access token', async () => {
        const response = await request(app).get('/auth/token');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('access_token');
        expect(response.body.access_token).toBe(getAccessToken());
    });

});
