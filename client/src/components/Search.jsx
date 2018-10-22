import React from 'react';
import axios from 'axios';
import { runInThisContext } from 'vm';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      genres: [],
      value: ''
    };
    this.getGenres = this.getGenres.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getGenres()
  }
  
  getGenres() {
    axios.get('/genres')
      .then((data) => {
        // console.log('getGenres', data.data)
        this.setState({
          genres: data.data
        })

      })
      .catch((err) => {
        console.log(err);
      })
    //make an axios request in this component to get the list of genres from your endpoint GET GENRES
  }

  handleChange(e) {
    this.setState({
      value: e.target.value
    })
    // console.log('change target value', this.state.value)
  }
  
  handleSubmit() {
    this.props.onSearch(this.state.value);
  }

  render() {
    return (
      <div className="search">
        <button onClick={() => {this.props.swapFavorites()}}>{this.props.showFaves ? "Show Results" : "Show Favorites"}</button>
        <br/><br/>

        
        {/* Make the select options dynamic from genres !!! */}
        {/* How can you tell which option has been selected from here? */}

        <select value={this.state.value} onChange={this.handleChange}>
          {this.state.genres.map((genre) => {
            return( 
              <option value={genre.id}>{genre.name}</option>
            )
          })}
        </select>
        <br/><br/>

        <button onClick={this.handleSubmit}>Search</button>

      </div>
    );
  }
}

export default Search;