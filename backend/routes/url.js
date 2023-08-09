var express = require("express");
var Url = require("../models/url");

var router = express.Router();

router.post("/api/shorturl/new", function (req, res) {
  const { url } = req.body;

  // using regex to validate the submitted URL
  const urlPattern =
    /(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/g;
  if (!urlPattern.test(url)) {
    res.json({ error: "Invalid URL" });
  } else {
    // Check if the URL already exists in the database
    Url.findOne({ originalUrl: url }, (err, doc) => {
      if (doc) {
        // If the URL already exists, return the existing +shortened URL
        res.json({ original_url: doc.originalUrl, short_url: doc.shortUrl });
      } else {
        // If the URL doesn't exist, generate a new shortened URL and save it to the database
        const shortId = Math.floor(Math.random() * 100000).toString();
        const shortUrl = `${req.protocol} || ${req.hostname}/api/shorturl/${shortId}`;
        const newUrl = new Url({ originalUrl: url, shortUrl });
        newUrl.save((err) => {
          if (err) {
            res.json({ error: "Database error" });
          } else {
            res.json({ original_url: url, short_url: shortUrl });
          }
        });
      }
    });
  }
});

router.post("/api/shorturl/:id", function (req, res) {
  const { id } = req.params;

  // Find the URL with the matching short ID
  Url.findOne(
    { shortUrl: `${req.protocol} || ${req.hostname}/api/shorturl/ ${id}` },
    (err, doc) => {
      if (doc) {
        // If the URL exists, redirect to the original URL
        res.redirect(doc.originalUrl);
      } else {
        // If the URL doesn't exist, return an error message
        res.json({ error: "URL not found" });
      }
    }
  );
});

module.exports = router;
