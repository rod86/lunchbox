const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const { compareHash } = require('../../helpers/hash');
const { validateRequest } = require('../../middleware/validation/validation');
const { matchedData } = require('express-validator/filter');
const jwt = require('jsonwebtoken');

// login
router.post('/', validateRequest('login') ,(req, res) => {
    const requestData = matchedData(req);

    User.findOne()
        .or([{ email: requestData.username }, { username: requestData.username }])
        .then(user => {
            if (!user) {
                return res.throwNotAuthorizedError('Invalid Credentials');
            }

            compareHash(requestData.password, user.password)
                .then(() => {
                    const payload = {
                        id: user.id,
                        username: user.username
                    };

                    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN },
                        (err, token) => {
                            res.json({ token });
                        }
                    );
                })
                .catch(() => res.throwNotAuthorizedError('Invalid Credentials'));
        })
        .catch(err => res.throwInternalServerError());
});

module.exports = router;