const mongoose = require('mongoose');
const Stand = mongoose.model('Stand');
const { milesToMeters, metersToMiles, MILE_METERS_RATE } = require('../helpers/unit-converter');

const findStandsNearCoordinates = (lat, lng, distanceUnit, maxDistance) => {
    distanceUnit = distanceUnit || 'meters';
    maxDistance = maxDistance || null;

    if (maxDistance && distanceUnit === 'miles') {
        maxDistance = milesToMeters(maxDistance);
    }

    return Stand.aggregate([
        {
            $geoNear: {
                near: { type: "Point", coordinates: [lng, lat] },
                maxDistance: maxDistance, 
                distanceField: 'distance',
                spherical: true
            }
        },  
        { $match: { active: true } },
        {
            $lookup: {
                from: "users",
                localField: "user",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $addFields: {
                distance: {
                    $cond: {
                        if: { $eq: [distanceUnit, "miles"]},
                        then: { $divide: ["$distance", MILE_METERS_RATE]},
                        else: "$distance"
                    }
                }
            }
        },
        {
            $project: { "user.password": 0 }
        }
    ]);
};

const findStandsByUser = userId => {
    return Stand.find({ user: userId })
        .sort('-created_at')
        .populate('user', '-password');
};

module.exports = { findStandsNearCoordinates, findStandsByUser };