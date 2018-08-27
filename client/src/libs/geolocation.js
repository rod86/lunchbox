import axios from 'axios';

export const getUserLocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject('Geolocation is not supported for this Browser/OS.');
        }

        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            resolve({ latitude, longitude });
        }, () => reject('An error ocurred while fetching your location.'));
    });
};

export const getCoordinatesFromAddress = address => {
    return new Promise((resolve, reject) => {
        const auth = axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['Authorization'];

        axios.get(`https://geocode.xyz/${address}?json=1`)
            .then(res => {
                axios.defaults.headers.common['Authorization'] = auth;
                const { latt, longt } = res.data;
                resolve({ 
                    longitude: parseFloat(longt), 
                    latitude: parseFloat(latt)
                });
            })
            .catch(err => {
                axios.defaults.headers.common['Authorization'] = auth;
                reject(err);
            });
    });
};