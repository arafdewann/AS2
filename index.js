const express = require("express");
const app = express();
const port = process.env.PORT || 3243;
const contentService = require("./content-service");

app.use(express.static("public"));

// Initialize content service
contentService
  .initialize()
  .then(() => {
    console.log("Content service initialized");

    app.get("/", (req, res) => {
      res.redirect("/home");
    });

    // Serve 'home.html' from the 'views' folder (optional)
    app.get("/home", (req, res) => {
      res.sendFile(__dirname + "/views/home.html");
    });

    // Serve 'about.html' from the 'views' folder
    app.get("/about", (req, res) => {
      res.sendFile(__dirname + "/views/about.html");
    });

    app.get("/articles", (req, res) => {
      contentService
        .getPublishedArticles()
        .then((articles) => {
          res.json(articles);
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    });

    app.get("/categories", (req, res) => {
      contentService
        .getCategories()
        .then((categories) => {
          res.json(categories);
        })
        .catch((err) => {
          res.status(500).json({ message: err });
        });
    });

    // 404 handling
    app.use((req, res) => {
      res.status(404).send("Page not found");
    });

    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
