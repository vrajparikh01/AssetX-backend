const mongoose = require('mongoose');
const app = require('./app');
const { config, validateConfig } = require('./config/config');
const logger = require('./config/logger');
const constant = require('./config/constant');
const getAWSSecretKey = require('./config/secretManager');
const https = require('https');
const fs = require('fs');

let server;
const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
};

const dbConnect = (callback) => {
    mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
        logger.info('Connected to MongoDB');
        callback();
    });
};

const startServer = () => {
    try {
        if (config.env === constant.DEV_NODE_ENV) {
            server = app.listen(config.port, () => {
                console.log(`Application is listening at http://localhost:${config.port}`);
            });
        } else if (config.env === constant.STAGING_NODE_ENV) {
            const httpsServer = https.createServer(
                {
                    key: fs.readFileSync(config.ssl.privateKey),
                    cert: fs.readFileSync(config.ssl.fullChainKey),
                },
                app
            );

            server = httpsServer.listen(config.port, () => {
                logger.info(`HTTPS Staging Server running on port ${config.port}`);
            });
        } else if (config.env === constant.PROD_NODE_ENV) {
            const httpsServer = https.createServer(
                {
                    key: fs.readFileSync(config.ssl.privateKey),
                    cert: fs.readFileSync(config.ssl.fullChainKey),
                },
                app
            );

            server = httpsServer.listen(config.port, () => {
                logger.info(`HTTPS Prod Server running on port ${config.port}`);
            });
        } else {
            logger.error('Please check your .env file for the specification');
            process.exit(1);
        }
    } catch (err) {
        console.log('Error in starting server', err);
    }
};

async function main() {
    try {
        if (config.env === constant.DEV_NODE_ENV) {
            validateConfig();
            startServer();
        } else if(config.env === constant.STAGING_NODE_ENV) {
            validateConfig();
            startServer();
        } else if(config.env === constant.PROD_NODE_ENV) {
            await getAWSSecretKey().then(async () => {
                validateConfig();
                console.log('Secrets fetched successfully');
                startServer();
            });
        }
        else {
            logger.error('Please check your .env file for the specification');
            process.exit(1);
        }
    } catch (error) {
        logger.error(error);
        exitHandler();
    }
}

main();

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
    logger.info('SIGTERM received');
    if (server) {
        server.close();
    }
});
