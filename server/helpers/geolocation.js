const axios = require('axios');

const formatAddress = location => {
    const { city, stnumber, staddress, state } = location;
    return `${stnumber} ${staddress}, ${city}, ${state}`;
};

const getAddressFromCoordinates = (lat, lng) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://geocode.xyz/${lat},${lng}?json=1`)
            .then(res => resolve(formatAddress(res.data)))
            .catch(err => reject(err));
    });
};

const getCoordinatesFromAddress = address => {
    return new Promise((resolve, reject) => {

        axios.get(`https://geocode.xyz/${address}?json=1`)
            .then(res => {
                const { latt, longt } = res.data;
                resolve({ 
                    longitude: parseFloat(longt), 
                    latitude: parseFloat(latt)
                });
            })
            .catch(err => reject(err));
    });
};

module.exports = { getAddressFromCoordinates, getCoordinatesFromAddress };