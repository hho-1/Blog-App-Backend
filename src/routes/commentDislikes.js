"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/commentDislikes:

const commentDislikes = require('../controllers/commentDislikes')

// URL: /commentDislikes

router.route('/')
    .get(commentDislikes.list)
    .post(commentDislikes.create)

router.route('/:id')
    .delete(commentDislikes.delete)

/* ------------------------------------------------------- */
module.exports = router