const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 3243;
const contentService = require("./content-service");

// Serve static files like CSS from the public folder
app.use(express.static(path.join(__dirname, "public")));

// Initialize content service
contentService
  .initialize()
  .then(() => {
    console.log("Content service initialized");

    // Redirect root URL to "/about"
    app.get("/", (req, res) => {
      res.redirect("/about");
    });

    // Serve 'about.html' from the 'views' folder
    app.get("/about", (req, res) => {
      res.sendFile(path.join(__dirname, "views", "about.html"));
    });

    // Serve published articles
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

    // Serve categories
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

    // Start the server
    app.listen(port, () => {
      console.log(`Express http server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error initializing content service:", err);
  });
