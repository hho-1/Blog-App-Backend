"use strict"

const router = require('express').Router()
/* ------------------------------------------------------- */
// routes/auth:

const auth = require('../controllers/auth')

// URL: /auth

router.post('/login', auth.login) 
router.post('/register', auth.register) 
router.post('/refresh', auth.refresh) 
router.post('/logout', auth.logout) 
router.post('/logout', auth.logout) 

/* ------------------------------------------------------- */
module.exports = router