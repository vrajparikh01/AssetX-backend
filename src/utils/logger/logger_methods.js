const { logger } = require('./index');

/**
 * @param {string} error_message //error_message from system
 * @param {Number} error_code //error code from system
 * @param {String} user_id //id of user generated the request from system
 * @param {String} current_end_point //current endPoint from system
 * @param {String} ip //ip of the user from system
 */

exports.errorM = async (error_message, error_code, user_id, current_end_point, ip) => {
    logger.error(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
};

/**
 * @param {string} error_message //error_message from system
 * @param {Number} error_code //error code from system
 * @param {String} user_id //id of user generated the request from system
 * @param {String} current_end_point //current endPoint from system
 * @param {String} ip //ip of the user from system
 */

// exports.warn = async (error_message, error_code, user_id, current_end_point, ip) => {
//     logger.warn(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`)
// }

/**
 * @param {string} error_message //error_message from system
 * @param {Number} error_code //error code from system
 * @param {String} user_id //id of user generated the request from system
 * @param {String} current_end_point //current endPoint from system
 * @param {String} ip //ip of the user from system
 */

exports.info = async (error_message, error_code, user_id, current_end_point, ip) => {
    logger.info(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
};

exports.logger_methods = {
    200: async (error_message, error_code, user_id, current_end_point, ip) => {
        logger.info(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
    },

    400: async (error_message, error_code, user_id, current_end_point, ip) => {
        logger.info(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
    },

    401: async (error_message, error_code, user_id, current_end_point, ip) => {
        logger.info(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
    },

    404: async (error_message, error_code, user_id, current_end_point, ip) => {
        logger.info(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
    },

    409: async (error_message, error_code, user_id, current_end_point, ip) => {
        logger.info(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
    },

    500: async (error_message, error_code, user_id, current_end_point, ip) => {
        logger.error(`${error_message}--:--${error_code}--:--${user_id}--:--${current_end_point}--:--${ip}`);
    },
};
