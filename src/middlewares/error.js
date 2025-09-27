const mongoose = require('mongoose');
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');
const constant = require('../config/constant');

const extractJSON = (text) => {
    // Using regex to find the JSON object starting with `revert=` and ending with the last `}`
    const jsonMatch = text.match(/revert=\{([^}]+}\s*)/);
    if (jsonMatch) {
        try {
            // Parse the matched JSON after adding braces
            return JSON.parse(`{${jsonMatch[1]}`);
        } catch (error) {
            return null;
        }
    }
    return null;
};

const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ApiError)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
        const message = error.message || httpStatus[statusCode];
        error = new ApiError(statusCode, message, false, err.stack);
    }
    next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;
    if (config.env === constant.PROD_NODE_ENV && !err.isOperational) {
        statusCode = httpStatus.INTERNAL_SERVER_ERROR;
        message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
    }

    res.locals.errorMessage = err.message;

    const jsonError = extractJSON(err.message);
    const response = {
        code: statusCode,
        message,
        ...(config.env === constant.DEV_NODE_ENV && { stack: err.stack }),
    };
    if (jsonError) {
        response.error = jsonError;
    }

    if (config.env === constant.DEV_NODE_ENV) {
        logger.error(err);
    }

    res.status(statusCode).send(response);
};

module.exports = {
    errorConverter,
    errorHandler,
};
