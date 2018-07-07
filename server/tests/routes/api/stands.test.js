const request = require('supertest');
const app = require('../../../app');
const { loginAs } = require('../../config/utils');

let token;

const lat = 51.49762151391874,
    lng = -0.076650793701219;

describe("GET /api/stands/search", () => {
    test("Should get results ordered by distance", (done) => {
        request(app)
            .get(`/api/stands/search?lat=${lat}&lng=${lng}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(200);
                expect(type).toEqual("application/json");

                expect(Array.isArray(body)).toBeTruthy();
                expect(body[0].name).toEqual("Green Paradise");
                expect(body[0].user[0]).not.toHaveProperty('password');
                expect(body[0].distance).toBeCloseTo(1187.0650679277958, 2);
                
                done();
            }); 
    });

    test("Should get results with distance in miles if I send miles as a distance unit", (done) => {
        request(app)
            .get(`/api/stands/search?lat=${lat}&lng=${lng}&distanceUnit=miles`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(200);
                expect(type).toEqual("application/json");

                expect(Array.isArray(body)).toBeTruthy();
                expect(body[0].name).toEqual("Green Paradise");
                expect(body[0].distance).toBeCloseTo(0.7376080365215862, 2);

                done();
            }); 
    });

    test("Should fail if lat and lng parameters are missing", (done) => {
        request(app)
            .get('/api/stands/search')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('lat');
                expect(body.errors).toHaveProperty('lng');

                done();
            }); 
    });

    test("Should fail if parameters are invalid types", (done) => {
        request(app)
            .get('/api/stands/search?lat=a&lng=b&maxDistance=c&distanceUnit=km')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('lat');
                expect(body.errors).toHaveProperty('lng');
                expect(body.errors).toHaveProperty('maxDistance');
                expect(body.errors).toHaveProperty('distanceUnit');

                done();
            }); 
    });
});

describe("POST /api/stands", () => {
    beforeAll(async (done) => {
        token = await loginAs('user1', 'password1234');
        done();
    });

    test("Should return created stand", (done) => {
        const stand = {
            name: 'Test Salads',
            description: 'Lorem ipsum dolor et sit amet',
            address: 'London',
            longitude: 51.50519452729941,
            latitude: -0.09061931126711897
        };

        request(app)
            .post('/api/stands')
            .set('Authorization', `Bearer ${token}`)
            .send(stand)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(201);
                expect(type).toEqual("application/json");

                expect(body.name).toEqual(stand.name);
                expect(body.description).toEqual(stand.description);
                expect(body.address).toEqual(stand.address);
                expect(body.location.coordinates[0]).toBe(stand.longitude);
                expect(body.location.coordinates[1]).toBe(stand.latitude);
                expect(body.active).toBeFalsy();

                done();
            });
    });

    test("Should require access token", (done) => {
        request(app)
            .post('/api/stands')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('description');
                expect(body.description).toEqual("Access Token Required");

                done();
            });
    });

    test("Should fail if required fields are missing", (done) => {
        request(app)
            .post('/api/stands')
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(400);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('errors');
                expect(body.errors).toHaveProperty('name');
                expect(body.errors).toHaveProperty('description');
                expect(body.errors).toHaveProperty('longitude');
                expect(body.errors).toHaveProperty('latitude');

                done();
            });
    });
});

describe("PUT /api/stands/:id", () => {
    beforeAll(async (done) => {
        token = await loginAs('user1', 'password1234');
        done();
    });

    test("Should be able to update a stand", (done) => {
        request(app)
            .put('/api/stands/5b3c072a2b1feb0f040f9a30')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Market Burguers 2',
                description: 'Lorem ipsum dolor et sit amet',
                address: 'London',
                longitude: 51.50519452729941,
                latitude: -0.09061931126711897
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(204);

                done();
            });
    });

    test("Should require access token", (done) => {
        request(app)
            .put('/api/stands/5b3c072a2b1feb0f040f9a30')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('description');
                expect(body.description).toEqual("Access Token Required");

                done();
            });
    });

    test("Should not be able to update other users stands", (done) => {
        request(app)
            .put('/api/stands/5b3c07d2f8538d0f57255620')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Top Curry 2',
                description: 'Lorem ipsum dolor et sit amet',
                address: 'London',
                longitude: 51.50519452729941,
                latitude: -0.09061931126711897
            })
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(404);

                done();
            });
    });
});

describe("DELETE /api/stands/:id", () => {
    beforeAll(async (done) => {
        token = await loginAs('user1', 'password1234');
        done();
    });

    test("Should be able to delete a stand", (done) => {
        request(app)
            .delete('/api/stands/5b3c072a2b1feb0f040f9a30')
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(204);

                done();
            });
    });

    test("Should require access token", (done) => {
        request(app)
            .delete('/api/stands/5b3c072a2b1feb0f040f9a30')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(401);
                expect(type).toEqual("application/json");

                expect(body).toHaveProperty('description');
                expect(body.description).toEqual("Access Token Required");

                done();
            });
    });

    test("Should not be able to delete other users stands", (done) => {
        request(app)
            .delete('/api/stands/5b3c07d2f8538d0f57255620')
            .set('Authorization', `Bearer ${token}`)
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(404);

                done();
            });
    });
});