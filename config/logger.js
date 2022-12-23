const winston = require("winston");
const path = require("path");

const levels = {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
};

const logger = winston.createLogger({
    format: winston.format.combine(
        winston.format.label({
            label: "order-service"
        }),
        winston.format.timestamp(),
        winston.format.splat(),
        winston.format.metadata({
            fillExcept: ["message", "level", "timestamp", "label"]
        }),
        winston.format.prettyPrint()
    )
});

if (process.env.NODE_ENV !== "production") {
    const consoleLogFormat = winston.format.printf(
        (info) =>
            `${info.timestamp} ${info.level} [${info.label}]: ${info.message}`
    );
    logger.add(
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                consoleLogFormat
            ),
            level: "debug"
        })
    );
}

module.exports = logger;
