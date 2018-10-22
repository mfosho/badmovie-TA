var express = require('express');
var bodyParser = require('body-parser');
var request = require('request')
var app = express();
var axios = require('axios');
const { API_KEY } = require('../config.js');
var model = require('./models/movieModel.js');

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
  // console.log('req is', req);
  // console.log('req body', req)
  var params = [req.body.title, req.body.poster_path, req.body.release_date.slice(0,4), req.body.vote_average]
  // console.log('params is', params)
  model.movies.post(params, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      model.movies.get((err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('get movie data from database', JSON.parse(JSON.stringify(data)));
          res.send(data);
        }
      })
    }
  })
});

app.post('/delete', function(req, res) {
  model.movies.delete(req.body.title, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      model.movies.get((err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log('get movie data from database', JSON.parse(JSON.stringify(data)));
          res.send(data);
        }
      })
    }
});

})
//OPTION 2: Use Express Router
//IF you decide to go with this option delete OPTION 1 to continue
//Routes
// const movieRoutes = require('./routes/movieRoutes.js');
// //Use routes
// app.use('/movies', movieRoutes);


app.listen(3000, function() {
  console.log('listening on port 3000!');
});
