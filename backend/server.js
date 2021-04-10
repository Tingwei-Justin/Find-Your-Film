//server.js
"use strict";
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
var cors = require("cors");
var movies = require("./routes/movie");
var tvs = require("./routes/tv");

app.use(express.static(path.join(__dirname, "dist/frontend")));
app.use(cors());
app.use("/apis/movies", movies);
app.use("/apis/tvs", tvs);

const HOST = "https://api.themoviedb.org/3/";
const API_KEY = "e4a71e31b4a3a43e6a6baa7f41c7486c";

app.get("/apis/", function (req, res) {
  res.send("This hw8 for csci571");
});

app.get("/apis/search/:name/:number", function (req, res) {
  var limit = req.params.number;
  const NAME = req.params.name;
  console.log(req.params);
  // console.log(limit);
  var URL =
    HOST + "search/multi?api_key=" + API_KEY + "&language=en-US&query=" + NAME;
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data.results.slice(0, limit);
      res.send(JSON.stringify(data));
      // res.send(JSON.stringify(response));
      // console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/apis/person/:id", function (req, res) {
  const ID = req.params.id;

  var URL =
    HOST + "person/" + ID + "?api_key=" + API_KEY + "&language=en-US&page=1";

  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

app.get("/apis/person/:id/external_ids", function (req, res) {
  const ID = req.params.id;

  var URL =
    HOST +
    "person/" +
    ID +
    "/external_ids?api_key=" +
    API_KEY +
    "&language=en-US&page=1";

  axios
    .get(URL)
    .then(function (response) {
      var data = response.data;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.use("/*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/frontend/index.html"));
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log("Press Ctrl+C to quit.");
});

module.exports = app;
