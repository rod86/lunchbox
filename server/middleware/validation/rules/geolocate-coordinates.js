const { query } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

module.exports = [
    query('lat')
        .exists().withMessage('This value is required')
        .isFloat().withMessage('Invalid value')
        .toFloat(),
    query('lng')
        .exists().withMessage('This value is required')
        .isFloat().withMessage('Invalid value')
        .toFloat()
];