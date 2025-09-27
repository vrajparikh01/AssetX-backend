const constant = require('../../config/constant');
const { developLogger } = require('./development_logger');
const { productionLogger } = require('./production_logger');

let logger;

// create logger for development
if (process.env.NODE_ENV === constant.DEV_NODE_ENV) {
    logger = developLogger();
}

// create logger for production
else if (process.env.NODE_ENV === constant.PROD_NODE_ENV) {
    logger = productionLogger();
}

// if environment variable is missing create logger for development
else {
    logger = developLogger();
}

module.exports = { logger };
