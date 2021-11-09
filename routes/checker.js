/**
 * Simple checker route to ensure express is working like it should. It may be
 * removed.
 */
const express = require('express'),
    checkerRoutes = require('./checker/checkerRoutes'),
    router = new express.Router();

router.use((req, res, next) => {
    next()
})
router.get('/hello', checkerRoutes.sayHello)
module.exports = router