const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/admin');

router.post('/signup', adminCtrl.signUp);
router.post('/login', adminCtrl.login);
module.exports = router;