const request = require('supertest');
const app = require('../../../app');

describe("POST /api/auth", () => {

    it("Should be able to login with username", (done) => {
        request(app)
            .post('/api/auth')
            .send({
                username: 'user1',
                password: 'password1234'
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(200);
                expect(type).toEqual("application/json");
                expect(body).toHaveProperty('token');

                done();
            });
    });

    it("Should be able to login with email", (done) => {
        request(app)
            .post('/api/auth')
            .send({
                username: 'user1@example.com',
                password: 'password1234'
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(200);
                expect(type).toEqual("application/json");
                expect(body).toHaveProperty('token');

                done();
            });
    });

    it("Should return not authorized error if username is invalid", (done) => {
        request(app)
            .post('/api/auth')
            .send({
                username: 'invalidusername',
                password: 'password1234'
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");
                
                expect(body.description).toEqual("Invalid Credentials");

                done();
            });
    });

    it("Should return not authorized error if password is invalid", (done) => {
        request(app)
            .post('/api/auth')
            .send({
                username: 'user1@example.com',
                password: 'invalid_password'
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");
                expect(body).toHaveProperty('description');
                expect(body.description).toEqual("Invalid Credentials");

                done();
            });
    });
});