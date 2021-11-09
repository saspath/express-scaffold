/**
 * Winston logger for express api 
 */
const { createLogger, transports, format } = require('winston')
const path = require('path')
const env = process.env.NODE_ENV
const dotenv = require('dotenv').config({ path: `.env.${env}` })
const level = process.env.LOG_LEVEL || 'debug'

const formatParams = (info) => {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace("T", " ");

    return `${ts} ${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(args, "", "")
        : ""}`;
}


const devFormat = format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
)

const prodFormat = format.combine(
    format.timestamp(),
    format.align(),
    format.printf(formatParams)
)

let logger

if (process.env.NODE_ENV !== 'production') {
    logger = createLogger({
        level,
        format: devFormat,
        transports: [new transports.Console()]
    })
} else {
    logger = createLogger({
        level,
        format: prodFormat,
        transports: [
            new transports.File({ filename: path.join(__dirname, '..', 'log', 'sqlerror.log'), level: 'error' }),
            new transports.File({ filename: path.join(__dirname, '..', 'log', 'info.log') }),
        ]
    })
}

logger.exceptions.handle(
    new transports.File({ filename: path.join(__dirname, '..', 'log', 'exceptions.log') })
)

module.exports = logger