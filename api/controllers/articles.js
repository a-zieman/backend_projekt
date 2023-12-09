const Article = require('../models/article');

exports.articles_get_all = (req, res) => {
  Article.find()
    .then((result) => {
      res.status(200).json({
        message: 'List of all articles',
        info: result,
      });
    })
    .catch((err) => res.status(500).json(err));
};

exports.articles_add_new = (req, res) => {
  const article = new Article({
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    publishedDate: req.body.publishedDate
  });
  article
    .save()
    .then((result) => {
      res.status(201).json({
        message: 'Added a new article',
        info: result,
      });
    })
    .catch((err) => res.status(500).json(err));
};

exports.articles_get_by_id = (req, res) => {
  const id = req.params.articleId;
  Article.findById(id)
    .then((result) => {
      res.status(200).json({
        message: 'Details of the article with ID ' + id,
        info: result,
      });
    })
    .catch((err) => res.status(500).json(err));
};

exports.articles_update = (req, res) => {
  const id = req.params.articleId;
  const updateData = {
    title: req.body.title,
    author: req.body.author,
    content: req.body.content,
    publishedDate: req.body.publishedDate
  };
  Article.findByIdAndUpdate(id, updateData)
    .then(() => {
      res
        .status(200)
        .json({ message: 'Updated article with ID ' + id });
    })
    .catch((err) => res.status(500).json(err));
};

exports.article_delete = (req, res) => {
  const id = req.params.articleId;
  Article.findByIdAndDelete(id)
    .then(() => {
      res.status(200).json({ message: 'Deleted article with ID ' + id });
    })
    .catch((err) => res.status(500).json(err));
};
