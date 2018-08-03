const request = require('supertest');
const app = require('../../../app');
const { loginAs } = require('../../config/utils');

let token;

describe("GET /api/profile", () => {

    beforeAll(async (done) => {
        token = await loginAs('user1', 'password1234');
        done();
    });

    it("Should return logged in user info without password", (done) => {
        request(app)
            .get('/api/profile')
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(200);
                expect(type).toEqual("application/json");

                expect(body.username).toBe("user1");
                expect(body).not.toHaveProperty('password');

                done();
            });
    });

    it("Should require authorization with access token", (done) => {
        request(app)
            .get('/api/profile')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");

                expect(body.description).toEqual("Access Token Required");

                done();
            });
    });

    it("Should fail if token is invalid", (done) => {
        request(app)
            .get('/api/profile')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViMzU2ZWQ0MWViZTAwMGQ-3aPlztVR4pHcAnwN5g7jY-2MmI3ZjRlMCIsInVzZXJuYW1lIjoidXNlcjEiLCJpYXQiOjE1MzA1Njc5MTksImV4cCI6MTUzMDU3NTExOX0.nfBfuNH1bKlIgaW8bBfDV')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");

                expect(body.description).toEqual("Invalid Access Token");

                done();
            });
    });
});

describe("POST /api/profile", () => {
    test("Should return created user with status 201", (done) => {
        const user = {
            username: "tester",
            email: "tester@example.com",
            password: "password1234",
            password_confirm: "password1234"
        };

        request(app)
            .post('/api/profile')
            .send(user)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(201);
                expect(type).toEqual("application/json");

                expect(body.username).toBe(user.username);
                expect(body.email).toBe(user.email);
                expect(body).not.toHaveProperty('password');

                done();
            });
    });

    test("Should not be able to create an user with an username that already exists", (done) => {
        request(app)
            .post('/api/profile')
            .send({
                username: "tester",
                email: "tester2@example.com",
                password: "password1234",
                password_confirm: "password1234"
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors.username).toBe("Username and/or email already in use");

                done();
            });
    });

    test("Should not be able to create an user with an email that already exists", (done) => {
        request(app)
            .post('/api/profile')
            .send({
                username: "tester2",
                email: "tester@example.com",
                password: "password1234",
                password_confirm: "password1234"
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors.username).toBe("Username and/or email already in use");

                done();
            });
    });

    test("Should fail if I send no data", (done) => {
        request(app)
            .post('/api/profile')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('username');
                expect(body.errors).toHaveProperty('email');
                expect(body.errors).toHaveProperty('password');
                expect(body.errors).toHaveProperty('password_confirm');

                done();
            });
    });

    test("Should fail if I send an invalid email", (done) => {
        request(app)
            .post('/api/profile')
            .send({
                username: "tester2",
                email: "invalidmail",
                password: "password1234",
                password_confirm: "password1234"
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('email');

                done();
            });
    });

    test("Should fail if I send a short password", (done) => {
        request(app)
            .post('/api/profile')
            .send({
                username: "tester2",
                email: "tester@example.com",
                password: "1234",
                password_confirm: "1234"
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('password');
                expect(body.errors).toHaveProperty('password_confirm');

                done();
            });
    });

    test("Should fail if password and password confirm are not equals", (done) => {
        request(app)
            .post('/api/profile')
            .send({
                username: "tester2",
                email: "tester@example.com",
                password: "1234",
                password_confirm: "1234"
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('password_confirm');

                done();
            });
    });
});

describe("DELETE /api/profile", () => {

    beforeAll(async (done) => {
        token = await loginAs('iosharry0', 'password1234');
        done();
    });

    test("Should delete user", (done) => {
        request(app)
            .delete('/api/profile')
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status } = response;

                expect(status).toBe(204);

                done();
            });
    });

    test("Should require access token", (done) => {
        request(app)
            .delete('/api/profile')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");

                expect(body.description).toEqual("Access Token Required");

                done();
            });
    });
});

describe("PUT /api/profile/password", () => {

    beforeAll(async (done) => {
        token = await loginAs('user2', 'password1234');
        done();
    });

    test("Should update password", (done) => {
        request(app)
            .put('/api/profile/password')
            .set('Authorization', `Bearer ${token}`)
            .send({
                current_password: 'password1234',
                password: '12345',
                password_confirm: '12345'
            })
            .end((err, response) => {
                const { status } = response;

                expect(status).toBe(204);

                done();
            });
    });

    test("Should require access token", (done) => {
        request(app)
            .put('/api/profile/password')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('description');
                expect(body.description).toEqual("Access Token Required");

                done();
            });
    });

    test("Should fail if any required field is missing", (done) => {
        request(app)
            .put('/api/profile/password')
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('current_password');
                expect(body.errors).toHaveProperty('password');
                expect(body.errors).toHaveProperty('password_confirm');

                done();
            });
    });

    test("Should fail if current password is invalid", (done) => {
        request(app)
            .put('/api/profile/password')
            .send({
                current_password: 'invalid_password',
                password: '12345',
                password_confirm: '12345'
            })
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body.description).toEqual('Invalid Request Data');
                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('current_password');

                done();
            });
    });

    test("Should fail if password and password confirm are not equals", (done) => {
        request(app)
            .put('/api/profile/password')
            .send({
                current_password: 'password1234',
                password: '12345',
                password_confirm: '1234567'
            })
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('password_confirm');

                done();
            });
    });
});