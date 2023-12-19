"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/comment:

const permissions = require('../middlewares/permissions')
const comment = require('../controllers/comment')

// URL: /comments

router.route('/')
    .get(comment.list)
    .post(comment.create)

router.route('/:id')
    .get(comment.read)
    .put(permissions.isLogin, comment.update)
    .patch(permissions.isLogin, comment.update)
    .delete(permissions.isLogin, comment.delete)

/* ------------------------------------------------------- */
module.exports = router