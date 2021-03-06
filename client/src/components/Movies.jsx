import React from 'react';

class Movies extends React.Component {
  constructor(props) {
    super(props)
  }

  handleClick(item) {
    console.log('saved item', item)
    // this.setState({
    //   movie: item
    // })
    this.props.showFaves ? this.props.onDelete(item): this.props.onSave(item)

  }

  // Make an onClick for each list item. If the movies shown is the search results, 
  // onClick add it to the database (do it in the main app, and pass down the function)

  // If you're currently showing the fave list, delete the movie instead
  // You can tell which list is currently being rendered based on whether the prop "showFaves" is false (search results) or true (fave list) (within index.jsx)

  render() {
    console.log('movies list', this.props.movies)
    if(this.props.movies !== undefined) {
      return (
        <ul className="movies">
          {/* /* Make this list dynamic! */}
          {this.props.movies.map((movie) => {
            // console.log('movie is', movie);
            let poster_path = movie.poster_path || movie.image_url;
            if (movie.release_date) {
              var year = movie.release_date.slice(0,4);
            } else {
              var year = movie.movie_year;
            }
            let vote_average = movie.vote_average || movie.rating;
            if (poster_path) {
              var img = `http://image.tmdb.org/t/p/w185/${poster_path}`
            } else {
              var img = 'https://lh3.googleusercontent.com/97gnjRiv2zIRnDupzfxYFoI-6zlIK3jKgb6KOCDf_tjWkY9epbITdSFIbiKhuccOqQ=w300'
            }
            return(
              <li className="movie_item" onClick={this.handleClick.bind(this, movie)}>
                <img src={img} />
                <div className="movie_description">
                  <h2>{movie.title}</h2>
                  <section className="movie_details">
                    <div className="movie_year">
                      <span className="title">Year</span>
                      <span>{year}</span>
                    </div>
                    <div className="movie_rating">
                      <span className="title">Rating</span>
                      <span>{vote_average}</span>
                    </div>
                  </section>
                </div>
              </li>
            )
          })} 

        </ul>
      );
  }
  }
}

export default Movies;