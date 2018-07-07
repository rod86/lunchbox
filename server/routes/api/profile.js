const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { generateHash, compareHash } = require('../../helpers/hash');
const { validateRequest } = require('../../middleware/validation/validation');
const { matchedData } = require('express-validator/filter');
const auth = require('../../middleware/auth');

// Get logged in user
router.get('/', auth, (req, res) => {
    res.json(req.user);
});

// Create profile
router.post('/', validateRequest('create-profile') ,(req, res) => {
    const requestData = matchedData(req);

    User.findOne()
        .or([{ email: requestData.email }, { username: requestData.username }])
        .then(user => {
            if (user) {
                return res.throwBadRequestError(null, { username: 'Username and/or email already in use' });
            }

            const newUser = new User({
                username: requestData.username,
                email: requestData.email,
                password: requestData.password
            });

            generateHash(newUser.password)
                .then(hash => {
                    newUser.password = hash;
                    
                    newUser.save()
                        .then(user => {
                            user = user.toObject();
                            delete user.password;
                            res.status(201).json(user);
                        })
                        .catch(err => res.throwInternalServerError());
                })
                .catch(err => res.throwInternalServerError());
        });
});

// delete profile
router.delete('/', auth, (req, res) => {
    User.findByIdAndRemove(req.user.id)
        .then(user => {
            if (!user) {
                res.throwNotFoundError('User Not Found');
            } else {
                res.status(204).json();
            }
        })
        .catch(err => res.throwInternalServerError());
});

// update password
router.put('/password', auth, validateRequest('update-password'), (req, res) => {
    const requestData = matchedData(req);

    User.findById(req.user._id)
        .then(user => {
            if (!user) {
                return res.throwNotAuthorizedError('Invalid Credentials');
            }

            compareHash(requestData.current_password, user.password)
                .then(() => {
                    generateHash(requestData.password)
                        .then(hash => {
                            user.password = hash;

                            user.save()
                                .then(user => res.status(204).json())
                                .catch(err => res.throwInternalServerError());
                        })
                        .catch(() => res.throwInternalServerError()); 
                })
                .catch(() => res.throwNotAuthorizedError('Invalid Credentials'));
        })
        .catch(err => res.throwInternalServerError());
});

module.exports = router;