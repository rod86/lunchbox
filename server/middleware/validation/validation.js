
const { validationResult } = require('express-validator/check');

/**
 * Format validation errors
 */
const errorFormater = ({ param, msg }) => {
    return msg;
};

/**
 * Handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
    const validationErrors = validationResult(req).formatWith(errorFormater);
    if (!validationErrors.isEmpty()) {
        return res.throwBadRequestError('Invalid Request Data', validationErrors.mapped());
    } 

    next();
};

/**
 * Middleware validate request
 */
const validateRequest = (rules) => {
    const rulesMiddleware = require(`./rules/${rules}`);
    rulesMiddleware.push(handleValidationErrors);
    return rulesMiddleware;
};

module.exports = { validateRequest };