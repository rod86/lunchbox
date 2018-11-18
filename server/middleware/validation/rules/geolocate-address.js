const { query } = require('express-validator/check');
const { sanitizeQuery } = require('express-validator/filter');

module.exports = [
    query('address')
        .exists().withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .toString()
];