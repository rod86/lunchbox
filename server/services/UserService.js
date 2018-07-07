const mongoose = require('mongoose');
const User = mongoose.model('User');

const findUsersWithStands = () => {
    return User.aggregate([
        { $project: { password: 0 }},
        { $lookup: {
            from: "stands",
            localField: "_id",
            foreignField: "user",
            as: "stands"
        }},
        { $sort: { created_at: -1 }}
    ]);
};

module.exports = { findUsersWithStands };