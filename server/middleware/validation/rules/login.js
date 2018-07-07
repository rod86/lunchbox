const { body } = require('express-validator/check');

module.exports = [
    body('username')
        .exists().withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .toString(),
    body('password')
        .exists().withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .toString()
];