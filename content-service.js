const axios = require('axios');

let articles = [];
let categories = [];

module.exports = {
  initialize: function () {
    return new Promise((resolve, reject) => {
      axios
        .get('http://localhost:3243/data/articles.json') // Adjust the URL path based on deployment
        .then((response) => {
          articles = response.data;

          return axios.get('http://localhost:3243/data/categories.json');
        })
        .then((response) => {
          categories = response.data;
          resolve();
        })
        .catch((err) => {
          reject('unable to read file');
        });
    });
  },
  getPublishedArticles: function () {
    return new Promise((resolve, reject) => {
      const publishedArticles = articles.filter(
        (article) => article.published === true
      );
      if (publishedArticles.length > 0) {
        resolve(publishedArticles);
      } else {
        reject('no results returned');
      }
    });
  },
  getCategories: function () {
    return new Promise((resolve, reject) => {
      if (categories.length > 0) {
        resolve(categories);
      } else {
        reject('no results returned');
      }
    });
  },
};
