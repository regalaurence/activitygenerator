import React, { Component } from 'react';
import axios from 'axios';

class Activity extends Component {

  state={
    isFavorite: false,
    currentFavorites: this.props.currentFavorites
  }

  componentDidMount = () => {
    if (this.state.currentFavorites.includes(this.props.idToPush)) {
      this.setState({
        isFavorite: true
      })
    }
  }

  toggleFavoritesHandler = () => {
    if (this.state.isFavorite === false) {
      this.props.addToFavorite(this.props.idToPush)
      this.setState({
        isFavorite : true
      })
    }
    else if (this.state.isFavorite === true) {
      this.props.removeFromFavorite(this.props.idToPush)
      this.setState({
        isFavorite : false
      })
    }
  }

  render() {
    return (
      <div>
        <h4>{this.props.activity.name}</h4>
        {this.state.isFavorite ? 
          <button onClick={this.toggleFavoritesHandler}>Remove from My Activties</button> :
          <button onClick={this.toggleFavoritesHandler}>Save to My Activities</button>
        }
      </div>
    )
  }
}

export default Activity;