var app = require('../app')
var db = app.get('db')

var Movie = function (movie) {
  this.id = movie.id
  this.title = movie.title
  this.overview = movie.overview
  this.release_date = movie.release_date
  this.inventory = movie.inventory
}

Movie.all = function (callback) {
  db.movies.find (function (error, movies) {
    callback(null, movies.map (function (movie) {
      return new Movie(movie)
    }))
  })
}

Movie.find = function(title, callback) {
  db.movies.findOne({title: title}, function(error, movie) {
    if(error || !movie) {
      callback(new Error("movie not found"), undefined)
    } else {
      callback(null, new Movie(movie))
    }
  })
}

Movie.sort = function(field, n, p, callback){
  db.movies.find({}, {
    order: field,
    limit: n,
    offset: p
  }, function(error, movies) {
    if (error || !movies) {
      callback(new Error("Could not retrieve movies"), undefined)
    } else {
      callback(null, movies.map (function (movie) {
        return new Movie(movie)
      }))
    }
  })
}

module.exports = Movie
