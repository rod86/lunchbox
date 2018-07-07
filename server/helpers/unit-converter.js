
const MILE_METERS_RATE = 1609.344;

const milesToMeters = value => {
    return value * MILE_METERS_RATE;
};

const metersToMiles = value => {
    return value / MILE_METERS_RATE;
};

module.exports = { milesToMeters, metersToMiles, MILE_METERS_RATE };