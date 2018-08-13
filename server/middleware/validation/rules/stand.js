const { body } = require('express-validator/check');

module.exports = [
    body('name')
        .exists().withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .toString(),
    body('description')
        .exists().withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .toString(),
    body('address')
        .exists().withMessage('This value is required')
        .isLength({ min: 1 }).withMessage('This value is required')
        .toString(),
    body('longitude')
        .exists().withMessage('This value is required')
        .isFloat().withMessage('This value must be a float')
        .toFloat(),
    body('latitude')
        .exists().withMessage('This value is required')
        .isFloat().withMessage('This value must be a float')
        .toFloat(),
    body('active')
        .optional().isBoolean().withMessage('Invalid value')
        .toBoolean()   
];