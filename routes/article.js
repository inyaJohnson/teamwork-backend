const express = require('express');
const router = express.Router();
const articleCtrl = require('../controllers/article');
const auth = require('../middleware/auth');
const commentCtrl = require("../controllers/comment");

router.get('/' + '', articleCtrl.getAllArticle);
router.post('/', auth,  articleCtrl.addArticle);
router.patch('/:articleId', auth, articleCtrl.updateArticle);
router.delete('/:articleId', auth, articleCtrl.deleteArticle);
router.get('/:articleId', articleCtrl.getOneArticle);
router.post('/:articleId/comment', auth,  commentCtrl.addArticleComment)

module.exports = router;