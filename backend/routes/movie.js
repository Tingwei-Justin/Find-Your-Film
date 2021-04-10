const express = require("express");
const router = express.Router();
const axios = require("axios");

const HOST = "https://api.themoviedb.org/3/";
const MOVIE_HOST = "https://api.themoviedb.org/3/movie/";
const API_KEY = "e4a71e31b4a3a43e6a6baa7f41c7486c";

router.get("/", function (req, res) {
  res.send("this is movie route");
});

router.get("/now_playing", function (req, res) {
  let URL =
    MOVIE_HOST + "now_playing?api_key=" + API_KEY + "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data.results.slice(0, 5);
      res.send(JSON.stringify(data));
      // res.send(JSON.stringify(response));
      // console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);

      res.send(error);
    });
});

router.get("/popular", function (req, res) {
  let URL =
    MOVIE_HOST + "popular?api_key=" + API_KEY + "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data.results;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(error);
    });
});

router.get("/top_rated", function (req, res) {
  let URL =
    MOVIE_HOST + "top_rated?api_key=" + API_KEY + "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data.results;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(error);
    });
});

router.get("/trending", function (req, res) {
  let URL =
    HOST + "trending/movie/day?api_key=" + API_KEY + "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data.results;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(error);
    });
});

router.get("/detail/:id", function (req, res) {
  const ID = req.params.id;
  let URL = MOVIE_HOST + ID + "?api_key=" + API_KEY + "&language=en-US&page=1";
  // console.log(URL);
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
      res.send(error);
    });
});

router.get("/video/:id", function (req, res) {
  const ID = req.params.id;
  let URL =
    MOVIE_HOST + ID + "/videos?api_key=" + API_KEY + "&language=en-US&page=1";
  // console.log(URL);
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var results = response.data.results;
      let target = {};
      for (var i = 0; i < results.length; i++) {
        var item = results[i];
        if (item.type === "Trailer") {
          target = item;
          break;
        } else if (item.type === "Teaser") {
          target = item;
        }
      }
      res.send(JSON.stringify(target));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(error);
    });
});

router.get("/credits/:id", function (req, res) {
  const ID = req.params.id;
  let URL =
    MOVIE_HOST + ID + "/credits?api_key=" + API_KEY + "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data.cast;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(error);
    });
});

router.get("/recommendations/:id", function (req, res) {
  const ID = req.params.id;
  let URL =
    MOVIE_HOST +
    ID +
    "/recommendations?api_key=" +
    API_KEY +
    "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      // handle success
      var data = response.data.results;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      // handle error
      console.log(error);
      res.send(error);
    });
});

router.get("/similar/:id", function (req, res) {
  const ID = req.params.id;
  let URL =
    MOVIE_HOST + ID + "/similar?api_key=" + API_KEY + "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      var data = response.data.results;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
});

router.get("/reviews/:id", function (req, res) {
  const ID = req.params.id;
  let URL =
    MOVIE_HOST + ID + "/reviews?api_key=" + API_KEY + "&language=en-US&page=1";
  axios
    .get(URL)
    .then(function (response) {
      var data = response.data.results;
      res.send(JSON.stringify(data));
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
