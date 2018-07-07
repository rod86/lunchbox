const { body } = require('express-validator/check');

module.exports = [
    body('username')
        .exists().withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .toString(),
    body('email')
        .exists().withMessage('This value is required')
        .isEmail().withMessage('This value must be a valid email')
        .toString(),
    body('password')
        .exists().withMessage('This value is required')
        .isLength({ min: 5 }).withMessage('This value must be 5 chars or more')
        .toString(),
    body('password_confirm')
        .exists().withMessage('This value is required')
        .isLength({ min: 5 }).withMessage('This value must be 5 chars or more')
        .custom((value, { req }) => value === req.body.password)
            .withMessage('Password Confirm must have the same value as password')
];