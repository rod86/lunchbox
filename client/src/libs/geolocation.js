
export const getCurrentLocation = () => {
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