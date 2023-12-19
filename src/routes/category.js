"use strict"


const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/category:

const permissions = require('../middlewares/permissions')
const category = require('../controllers/category')

// URL: /categories

router.route('/')
    .get(category.list)
    .post(permissions.isAdmin, category.create)

router.route('/:id')
    .get(category.read)
    .put(permissions.isAdmin, category.update)
    .patch(permissions.isAdmin, category.update)
    .delete(permissions.isAdmin, category.delete)

/* ------------------------------------------------------- */
module.exports = router