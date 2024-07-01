"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/:

// URL: /

// auth:
router.use('/auth', require('./auth'))
// call user.create for /account/register:
const { create: userCreate } = require('../controllers/user')
router.post('/account/register', userCreate)

// user:
router.use('/users', require('./user'))
// token:
router.use('/tokens', require('./token'))


// category:
router.use('/categories', require('./category'))
// contribution:
router.use('/blogs', require('./contribution'))
// comment:
router.use('/comments', require('./comment'))
// likes:
router.use('/likes', require('./like'))
// commentlikes:
router.use('/commentlikes', require('./commentLikes'))
// commentlikes:
router.use('/commentdislikes', require('./commentDislikes'))
// commentlikes:
router.use('/status', require('./status'))
//documents
router.use('/documents', require('./document'))
//auth
router.use('/auth', require('./auth'))



/* ------------------------------------------------------- */
module.exports = router