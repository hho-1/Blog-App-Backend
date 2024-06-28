"use strict";

const router = require("express").Router();
/* ------------------------------------------------------- */
// routes/likes:

const like = require("../controllers/like");

// URL: /likes

router.route("/").get(like.list).post(like.create);

router.route("/:id").delete(like.delete);

/* ------------------------------------------------------- */
module.exports = router;
