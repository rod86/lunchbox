const { metersToMiles, milesToMeters, MILE_METERS_RATE } = require('../../helpers/unit-converter');

describe("Unit Converter Helper", () => {
    test('Meters are converted to miles', () => {
        const result = metersToMiles(MILE_METERS_RATE);
        expect(result).toEqual(1);
    });
    
    test('Miles are converted to meters', () => {
        const result = milesToMeters(1);
        expect(result).toBe(MILE_METERS_RATE);
    });
});