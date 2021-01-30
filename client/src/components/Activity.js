import React, { Component } from 'react';
import axios from 'axios';

class Activity extends Component {

  state = {
    isFavorite: false,
    isHighPriority: false,
    currentFavorites: this.props.currentFavorites
  }

  componentDidMount = () => {
    let isFavorite = !!this.state.currentFavorites.some(item => item.activityID === this.props.idToPush)
    console.log(isFavorite)
    if (isFavorite) {
      this.setState({
        isFavorite: true
      })
    }
  }


  toggleFavoritesHandler = (event) => {
    if (this.state.isFavorite === false) {
      this.props.addToFavorite(this.props.idToPush, this.state.isHighPriority)
      this.setState({
        isFavorite: true
      })
    }
    else if (this.state.isFavorite === true) {
      this.props.removeFromFavorite(this.props.idToPush)
      this.setState({
        isFavorite: false
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      isHighPriority : event.target.value
    })
  }

  render() {
    return (
      <div>
        <h4>{this.props.activity.name}</h4>
        {this.state.isFavorite ?
          <button onClick={this.toggleFavoritesHandler}>Remove from My Activties</button> :
          <form onSubmit={this.toggleFavoritesHandler}>
            <select id="priority" name="priority" onChange={this.handleChange}>
              <option value="false">Low priority</option>
              <option value="true">High priority</option>
            </select>
            <button type="submit">Save to My Activities</button>
          </form>
        }
      </div>
    )
  }
}

export default Activity;