const express = require("express");
const router = express.Router();
const gifCtrl = require('../controllers/gif');
const auth = require('../middleware/auth');
const commentCtrl = require("../controllers/comment");

router.get('/' + '', gifCtrl.getAllGif);
router.post('/', auth,  gifCtrl.addGif);
router.patch('/:gifId', auth, gifCtrl.updateGif);
router.delete('/:gifId', auth, gifCtrl.deleteGif);
router.get('/:gifId', gifCtrl.getOneGif);
router.post('/:gifId/comment', auth,  commentCtrl.addGifComment)

module.exports = router;