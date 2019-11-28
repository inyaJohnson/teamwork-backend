const express = require("express");
const router = express.Router();
const gifCtrl = require('../controllers/gif');

router.post('/upload', gifCtrl.addGif);

module.exports = router;