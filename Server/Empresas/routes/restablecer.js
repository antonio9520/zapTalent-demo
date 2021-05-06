const express = require('express');
const router = express.Router();
const restablecerControllers = require("../controllers/restablecerControllers") ;

router.post('/:emails', restablecerControllers.enviarToken);

router.get('/:token', restablecerControllers.resetPassword);

module.exports = router;
