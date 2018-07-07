const request = require('supertest');
const app = require('../../../app');

describe("GET /api/users", () => {

    it("Should return a valid response", (done) => {
        request(app)
            .get('/api/users')
            .end((err, response) => {
                const { status, type, body } = response;

                expect(status).toBe(200);
                expect(type).toEqual("application/json");

                expect(Array.isArray(body)).toBeTruthy();
                expect(body.length).toBeGreaterThan(0);
                
                const row = body[0];
                expect(row).not.toHaveProperty('password');
                expect(Array.isArray(row.stands)).toBeTruthy();

                done();
            });
    });
});