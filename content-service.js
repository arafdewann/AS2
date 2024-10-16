cconst articles = require('./data/articles.json');
const categories = require('./data/categories.json');

module.exports = {
  initialize: function () {
    return Promise.resolve();
  },
  getPublishedArticles: function () {
    return new Promise((resolve, reject) => {
      const publishedArticles = articles.filter((article) => article.published === true);
      if (publishedArticles.length > 0) {
        resolve(publishedArticles);
      } else {
        reject('No results returned');
      }
    });
  },
  getCategories: function () {
    return new Promise((resolve, reject) => {
      if (categories.length > 0) {
        resolve(categories);
      } else {
        reject('No results returned');
      }
    });
  }
};
