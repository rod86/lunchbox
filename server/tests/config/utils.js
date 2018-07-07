const app = require('../../app');
const request = require('supertest');

const loginAs = (username, password) => {
    return new Promise((resolve, reject) => {
        request(app)
            .post('/api/auth')
            .send({ username, password })
            .end( (err, response) => {
                resolve(response.body.token);
            });
    }); 
};


module.exports = { loginAs };