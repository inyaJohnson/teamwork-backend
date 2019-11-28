const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const auth = require('../middleware/article');
const commentCtrl = require("../controllers/comment");

router.get('/' + '', articleCtrl.getAllArticle);
router.post('/', auth,  articleCtrl.addArticle);
router.put('/:id', auth, articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.post('/:id/comment', commentCtrl.addComment)

module.exports = router;