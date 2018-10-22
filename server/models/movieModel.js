//SELECT one db to work with
//For SQL
var sqlDb = require('../../db/sql');
//For Mongo
// const mongoDb = require('../../db/mongodb')

module.exports = {
  movies: {
    get: function(callback) {
      sqlDb.connection.query('SELECT * FROM movie', function(err, results) {
        callback(err, results);
      })
    },
    post: function(params, callback) {
      sqlDb.connection.query('INSERT INTO movie (TITLE, IMAGE_URL, MOVIE_YEAR, RATING) \
                              values (?, ?, ?, ?)', params, function(err, results) {
                                callback(err, results);
                              })
    },
    delete: function(params, callback) {
      sqlDb.connection.query('DELETE FROM movie WHERE title = ?', params, function(err, results) {
        callback(err, results);
      })
    }
  }

}
