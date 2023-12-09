const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth');

const ArticleController = require('../controllers/articles');

router.get('/', ArticleController.articles_get_all);

router.post('/', checkAuth, ArticleController.articles_add_new);

router.get('/:articleId', ArticleController.articles_get_by_id);

router.put('/:articleId', checkAuth, ArticleController.articles_update);

router.delete('/:articleId', checkAuth, ArticleController.article_delete);

module.exports = router;
