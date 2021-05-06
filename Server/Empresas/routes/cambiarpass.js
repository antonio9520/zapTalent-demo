const express = require('express');
const router = express.Router();
const restablecerControllers = require("../controllers/restablecerControllers") ;

router.post('/:token', restablecerControllers.actualizarPassword);



module.exports = router;
