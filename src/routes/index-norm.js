"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// category:
router.use('/categories', require('./category'))
// comment:
router.use('/comments', require('./comment'))
// contribution:
router.use('/blogs', require('./contribution'))



/* ------------------------------------------------------- */
module.exports = router