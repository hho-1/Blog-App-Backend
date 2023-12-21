"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/user:

const { isLogin } = require('../middlewares/permissions')
const user = require('../controllers/user')
const permissions = require('../middlewares/permissions')

// URL: /users

router.route('/')
    .get(user.list)
    .post(permissions.isAdmin, user.create)

router.route('/:id')
    .get(user.read)
    .put(permissions.isAdmin, user.update)
    .patch(permissions.isAdmin, user.update)
    .delete(permissions.isAdmin, user.delete)

/* ------------------------------------------------------- */
module.exports = router