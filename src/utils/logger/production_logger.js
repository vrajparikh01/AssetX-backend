const { createLogger, format, transports } = require('winston');

const { combine, timestamp, printf } = format;

// production logger
exports.productionLogger = () => {
    const myFormat = printf(({ level, message, timestamp: t }) => {
        return `${t}--:--${level}--:--${message}`;
    });

    return createLogger({
        level: 'silly',
        format: combine(timestamp({ format: 'HH:mm:ss' }), myFormat),

        transports: [
            new transports.File({ filename: './logs/production_logs/error.log', level: 'error' }),
            new transports.File({ filename: './logs/production_logs/info.log', level: 'info' }),
        ],
    });
};
