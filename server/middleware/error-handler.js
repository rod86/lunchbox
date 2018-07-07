
function ApiError(status, name, description, errors) {
    this.constructor.prototype.__proto__ = Error.prototype;
    Error.captureStackTrace(this, this.constructor);
    this.name = name;
    this.status = status || 500;
    this.description = description || null;
    this.errors = errors || null;
};

/**
 * Create error response
 */
const buildErrorResponse = err => {
    return Object.assign({
            status: err.status,
            name: err.name,
        },
        err.description && { description: err.description },
        err.errors && { errors: err.errors }
    );
};

/**
 * add throw error functions to response object
 */
const init = (req, res, next) => {
    res.throwApiError = (status, name, description, errors) => {
        return next(new ApiError(status, name, description, errors));
    };

    res.throwNotFoundError = (description) => {
        description = description || 'Not Found';
        return res.throwApiError(404, 'NOT_FOUND', description);
    };

    res.throwInternalServerError = (description) => {
        description = description || 'A server error occurred';
        return res.throwApiError(500, 'INTERNAL_SERVER_ERROR', description);
    };

    res.throwNotAuthorizedError = (description) => {
        description = description || 'Not Authorized';
        return res.throwApiError(401, 'NOT_AUTHORIZED', description);
    };

    res.throwBadRequestError = (description, errors) => {
        description = description || 'Bad Request';
        return res.throwApiError(400, 'BAD_REQUEST', description, errors);
    };

    next();
};

module.exports = { init, buildErrorResponse };