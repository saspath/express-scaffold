/**
 * express api server
 * A simple scaffold of express server with a sample `/hello` route. 
 */
const express = require('express')
const http = require('http')
const path = require('path')

// cors handler
const cors = require('cors')

// cookie parser
const cookieParser = require('cookie-parser')

const morgan = require('morgan')

// log file rotator
const rfs = require('rotating-file-stream')

// api logger based on Winston
const logger = require('./logger/logger')

// server port
const serverPort = process.env.EXPRESS_PORT || 3000

// application routes
const checker = require('./routes/checker.js')

let server

// instantiate express
const app = express()

// create log streams for access / error logs
const accessStream = rfs.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

const errorStream = rfs.createStream('error.log', {
    interval: '1d',
    path: path.join(__dirname, 'log')
})

// error or success
const skipSuccess = (req, res) => res.statusCode < 400
const skipError = (req, res) => res.statusCode >= 400


// log errors
app.use(morgan('combined', {
    skip: skipSuccess,
    stream: errorStream
}))

// log success
app.use(morgan('combined', {
    skip: skipError,
    stream: accessStream
}))

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// use cors 
app.use(cors())

// parses cookie set in request 
app.use(cookieParser())

server = new http.Server(app)

/**
 * configure and run server 
 * @param {*} onData 
 * @param {*} onErr 
 */
const runServer = (onData, onErr) => {
    // user router
    app.use('/checker', checker)

    // all errors sent back as json 
    app.use((err, req, res, next) => {
        if (res.headerSent) {
            next(err)
            return
        }

        logger.error(err.message, { url: req.originalUrl })
        res.status(500)
        res.json({ error: err.message })
    })

    server.listen(serverPort, () => {
        logger.info(`Express listening on port ${serverPort}`)
    })
}

// server entry point
runServer()