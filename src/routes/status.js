"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/status:

const permissions = require('../middlewares/permissions')
const status = require('../controllers/status')

// URL: /categories

router.route('/')
    .get(status.list)
    .post(permissions.isAdmin, status.create)

router.route('/:id')
    .get(status.read)
    .put(permissions.isAdmin, status.update)
    .patch(permissions.isAdmin, status.update)
    .delete(permissions.isAdmin, status.delete)

/* ------------------------------------------------------- */
module.exports = router