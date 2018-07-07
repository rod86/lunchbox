const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req, res, next) => {
    if (req.hasOwnProperty('headers') && req.headers.hasOwnProperty('authorization')) {
        try {
            const token = req.headers['authorization'].split(" ")[1] || null;

            if (!token) {
                res.throwNotAuthorizedError('Access Token Required');
            }

            const jwt_payload = jwt.verify(token, process.env.JWT_SECRET);
            
            User.findById(jwt_payload.id)
                .select('-password')
                .then(user => {
                    if (!user) {
                        res.throwNotAuthorizedError('Invalid Access Token');
                    }
                    req.user = user;
                    next();
                })
                .catch(err => res.throwNotAuthorizedError('Invalid Access Token'));
        } catch (error) {
            res.throwNotAuthorizedError('Invalid Access Token');
        }
    } else {
        res.throwNotAuthorizedError('Access Token Required');
    }
};