const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: String,
  content: String,
  datePosted: { type: Date, default: Date.now },
  author: String,
  posterUrl: String,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;


//Used this command below to import json file to Mongo atlas
/*mongoimport --uri "mongodb+srv://byteforce:Byteforce77mdev@kickashcluster.ec6taqa.mongodb.net/KickAsh" \
--collection articles --file article.json --jsonArray*/