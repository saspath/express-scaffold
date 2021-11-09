/**
 * Sample responder to `/hello` route :)
 */
const logger = require('../../logger/logger')

const sayHello = (req, res) => {
    logger.info(`Checker route! Saying hello from ${req.originalUrl}`)
    res.status(200).json({ "message": "Hello Express! I am ready for work!" })
}

module.exports = {
    sayHello
}