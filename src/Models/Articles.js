const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  datePosted: { type: Date, default: Date.now },
  author: String,
  posterUrl: String,
  videoUrl: String,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;


//Used this command below to import json file to Mongo atlas
/*mongoimport --uri "the uri provided by mongo to connect/KickAsh" \
--collection articles --file article.json --jsonArray*/