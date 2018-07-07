const { body } = require('express-validator/check');

module.exports = [
    body('current_password')
        .exists().withMessage('This value is required')
        .isLength({ min: 5 }).withMessage('This value must be 5 chars or more')
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