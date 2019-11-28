const userCtrl = require('../controllers/user');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/admin');

router.post('/auth/create-user', auth, userCtrl.addUser);
router.get('/auth/user' + '', auth, userCtrl.getAllUsers);
router.get('/auth/user/:id', auth, userCtrl.getOneUser);
router.delete('/auth/delete-user/:id', auth, userCtrl.deleteUser);
router.put('/auth/update-user/:id', auth, userCtrl.updateUser);
router.post('/auth/signin', userCtrl.signIn);


module.exports = router;