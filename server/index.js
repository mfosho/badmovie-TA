var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var axios = require('axios');
const { API_KEY } = require('../config.js');

//Helpers
var apiHelpers = require('./helpers/apiHelpers.js');

//Middleware
app.use(bodyParser.json());

// Due to express, when you load the page, it doesn't make a get request to '/', it simply serves up the dist folder
app.use(express.static(__dirname + '/../client/dist'));


//OPTION 1: Use regular routes
app.get('/search', function(req, res) {
  // get the search genre     
  // console.log(req.bodyParser.params.genre);
  // console.log('genre is', req.query.genre)
  axios.get('https://api.themoviedb.org/3/discover/movie', {
    params: {
      with_genres: req.query.genre,
      api_key: API_KEY,
      sort_by: 'vote_average.asc'
    }
  })
    .then((data) => {
      res.send(JSON.stringify(data.data.results));
    })
    .catch((err) => {
      console.log(err);
    })
  // https://www.themoviedb.org/account/signup

  // use this endpoint to search for movies by genres, you will need an API key

  // https://api.themoviedb.org/3/discover/movie

  // and sort them by horrible votes using the search parameters in the API
});

app.get('/genres', function(req, res) {
  // make an axios request to get the list of official genres
  axios.get('https://api.themoviedb.org/3/genre/movie/list', {
    params: {
      api_key: API_KEY
    }
  })
    .then((data) => {
      var genres = JSON.stringify(data.data.genres);
      res.send(JSON.parse(genres));
    })
    .catch((err) => {
      console.log(err)
    });
  // use this endpoint, which will also require your API key: https://api.themoviedb.org/3/genre/movie/list
  
  // send back
});

app.post('/save', function(req, res) {

});

app.post('/delete', function(req, res) {

});

//OPTION 2: Use Express Router
//IF you decide to go with this option delete OPTION 1 to continue
//Routes
// const movieRoutes = require('./routes/movieRoutes.js');
// //Use routes
// app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
