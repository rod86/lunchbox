const express = require('express');
const router = express.Router();
const { validateRequest } = require('../../middleware/validation/validation');
const { matchedData } = require('express-validator/filter');
const { getAddressFromCoordinates, getCoordinatesFromAddress } = require('../../helpers/geolocation');

router.get('/coordinates', validateRequest('geolocate-coordinates'), (req, res) => {
    const requestData = matchedData(req);
    const { lat, lng } = requestData;
    
    getAddressFromCoordinates(lat, lng)
        .then(address => res.json({ address }))
        .catch(err => res.throwInternalServerError('Error geolocating coordinates'));
});

router.get('/address', validateRequest('geolocate-address'), (req, res) => {
    const requestData = matchedData(req);
    const { address } = requestData;
    
    getCoordinatesFromAddress(address)
        .then(coordinates => res.json(coordinates))
        .catch(err => res.throwInternalServerError('Error geolocating address'));
});

module.exports = router;