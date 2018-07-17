"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

//URL encoding converts characters into a format that can be transmitted over the Internet.
//bodyParser.urlencoded returns middleware that only parses urlencoded bodies and only looks at requests where 
//the Content-Type header matches the type option. This parser accepts only UTF-8 encoding of 
//the body and supports automatic inflation of gzip and deflate encodings.

app.use(bodyParser.urlencoded({ extended: true }));

//To serve static files such as images, CSS files, and JavaScript files, 
//use the express.static built-in middleware function in Express.
//The function signature is:
//express.static(root, [options])
//The root argument specifies the root directory from which to serve static assets.

app.use(express.static("public"));

// The in-memory database of tweets. It's a basic object with an array in it.
const db = require("./lib/in-memory-db");

// The `data-helpers` module provides an interface to the database of tweets.
// This simple interface layer has a big benefit: we could switch out the
// actual database it uses and see little to no changes elsewhere in the code
// (hint hint).
//
// Because it exports a function that expects the `db` as a parameter, we can
// require it and pass the `db` parameter immediately:
const DataHelpers = require("./lib/data-helpers.js")(db);

// The `tweets-routes` module works similarly: we pass it the `DataHelpers` object
// so it can define routes that use it to interact with the data layer.
const tweetsRoutes = require("./routes/tweets")(DataHelpers);

// Mount the tweets routes at the "/tweets" path prefix:
app.use("/tweets", tweetsRoutes);

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
