const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Stand = mongoose.model('Stand');
const { validateRequest } = require('../../middleware/validation/validation');
const { matchedData } = require('express-validator/filter');
const auth = require('../../middleware/auth');
const { findStandsNearCoordinates } = require('../../services/StandService');

router.get('/', (req, res) => {
    Stand.find()
        .populate('user', '-password')
        .then(stands => res.json(stands))
        .catch(err => res.throwInternalServerError());
});

router.get('/search', validateRequest('stands-search'), (req, res) => {
    const requestData = matchedData(req);
    const { lat, lng, distanceUnit, maxDistance } = requestData;

    findStandsNearCoordinates(lat, lng, distanceUnit, maxDistance)
        .then(stands => res.json(stands))
        .catch(() => res.throwInternalServerError());
});

router.post('/', auth, validateRequest('stand'), (req, res) => {
    const requestData = matchedData(req);

    const newStand = {
        user: req.user.id,
        name: requestData.name,
        description: requestData.description,
        address: requestData.address,
        location: {
            type: 'Point', 
            coordinates: [requestData.longitude, requestData.latitude]
        },
        active: (requestData.active !== undefined && requestData.active)
    };

    new Stand(newStand)
        .save()
        .then(stand => res.status(201).json(stand))
        .catch(() => res.throwInternalServerError());
});

router.put('/:id', auth, validateRequest('stand'), (req, res) => {
    const requestData = matchedData(req);

    Stand.findOne({ _id: req.params.id, user: req.user.id })
        .then(stand => {
            if (!stand) {
                return res.throwNotFoundError();
            }

            stand.name = requestData.name;
            stand.description = requestData.description;
            stand.address = requestData.address;
            stand.location.coordinates = [requestData.longitude, requestData.latitude];
            stand.active = (requestData.active !== undefined && requestData.active);

            stand.save()
                .then(stand => res.status(204).json())
                .catch(() => res.throwInternalServerError());
        })
        .catch(() => res.throwInternalServerError());
});

router.delete('/:id', auth, (req, res) => {
    Stand.findOne({ _id: req.params.id, user: req.user.id })
        .then(stand => {
            if (!stand) {
                return res.throwNotFoundError();
            }
            
            stand.remove()
                .then(() => res.status(204).json())
                .catch(() => res.throwInternalServerError());
        })
        .catch(() => res.throwInternalServerError());
});

module.exports = router;