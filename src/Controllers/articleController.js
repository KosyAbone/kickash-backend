const Article = require('../Models/Articles');

// Get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json({articles, success: true});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

// Get single article by ID
const getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json({article, success: true});
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', success: false });
  }
};

module.exports = { getAllArticles, getArticleById };
