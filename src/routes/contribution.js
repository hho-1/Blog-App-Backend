"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/contribution:

const permissions = require('../middlewares/permissions')
const contribution = require('../controllers/contribution')

// URL: /blogs

router.route('/')
    .get(contribution.list)
    .post(permissions.isLogin, contribution.create)

router.route('/:id')
    .get(contribution.read)
    .put(permissions.isLogin, contribution.update)
    .patch(permissions.isLogin, contribution.update)
    .delete(permissions.isLogin, contribution.delete)

/* ------------------------------------------------------- */
module.exports = router