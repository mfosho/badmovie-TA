import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import AnyComponent from './components/filename.jsx'
import Search from './components/Search.jsx';
import Movies from './components/Movies.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  	super(props)
  	this.state = {
      movies: [],
      favorites: [],
      showFaves: false,
    };
    this.swapFavorites = this.swapFavorites.bind(this);
    this.getMovies = this.getMovies.bind(this);
    this.saveMovie = this.saveMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    // you might have to do something important here!
  }

  getMovies(genreId) {
    // make an axios request to your server on the GET SEARCH endpoint
    // event.preventDefault()
    console.log('genreId', genreId)
    if (genreId) {
      axios.get('/search', {
        params: {
          genre: genreId
        }
      })
        .then((data) => {
          // console.log('getMovies', data)
          this.setState({
            movies: data.data})
        })
        .catch((err) => {
          console.log(err)
        })
    } else {
      axios.get('/search')
        .then((data) => {
          console.log('getMovies', data)
          this.setState({
            movies: data.data})
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  saveMovie(movie) {
    // same as above but do something diff
    
  }

  deleteMovie() {
    // same as above but do something diff
  }

  swapFavorites() {
  //dont touch
    this.setState({
      showFaves: !this.state.showFaves
    });
  }

  render () {
  	return (
      <div className="app">
        <header className="navbar"><h1>Bad Movies</h1></header> 
        
        <div className="main">
          <Search onSearch={this.getMovies} swapFavorites={this.swapFavorites} showFaves={this.state.showFaves}/>
          <Movies onSave={this.saveMovie} movies={this.state.showFaves ? this.state.favorites : this.state.movies} showFaves={this.state.showFaves}/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));