"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/commentLikes:

const commentLikes = require('../controllers/commentLikes')

// URL: /commentLikes

router.route('/')
    .get(commentLikes.list)
    .post(commentLikes.create)

router.route('/:id')
    .delete(commentLikes.delete)

/* ------------------------------------------------------- */
module.exports = router