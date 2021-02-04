import React, { Component } from 'react';

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
      <div className="columns is-vcentered is-centered has-text-centered mt-6">
      <div className="field">
       <div className="content mb-4"><h2 className="has-text-warning">{this.props.activity.name}</h2></div>
       <div className="content"><p className="has-text-centered">{this.props.activity.description}</p></div>
       <div className="content"><a href={this.props.activity.url} className="has-text-centered">{this.props.activity.url}</a></div>

        {this.state.isFavorite ?
          <button className="button is-light is-small" onClick={this.toggleFavoritesHandler}>Remove from My Activties</button> :
          <form onSubmit={this.toggleFavoritesHandler}>
          <div className="field is-grouped columns is-vcentered is-centered">
          
          <div className="control">
    <div className="select mb-3 has-text-centered is-small">
            <select id="priority" name="priority" onChange={this.handleChange}>
              <option value="false">Low priority</option>
              <option value="true">High priority</option>
            </select>
</div>
            <div className="control">
                  <button type="submit" className="button is-light is-small">Save to My Activities</button>
                </div>
</div>
            </div>
          </form>
        }
      
      </div>
      </div>







    )
  }
}

export default Activity;