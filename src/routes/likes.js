"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/likes:

const likes = require('../controllers/likes')

// URL: /likes

router.route('/')
    .get(likes.list)
    .post(likes.create)

router.route('/:id')
    .delete(likes.delete)

/* ------------------------------------------------------- */
module.exports = router