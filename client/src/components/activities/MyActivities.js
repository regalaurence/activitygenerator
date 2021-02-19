import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import SavedActivity from './SavedActivity'
class MyActivities extends Component {


  render() {
    
    return (

      // this.state.activityDetailsShown ?
      // <div><p>Checking here</p></div> :

      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered center">
              <figure className="image is-vcentered is-centered has-text-centered mb-6">
                <img style={{ maxWidth: "412px" }} alt="logo" src="images/Myactivities.png" />
              </figure>
            </div>
            <div className="columns is-multiline is-mobile center">
            <div className="content"><h4 className="has-text-centered">Your Favourites Activities:</h4></div>
              {this.props.currentFavorites &&
                this.props.currentFavorites.map(activity =>
                  <SavedActivity 
                    removeFromFavorites={this.removeFromFavorites}
                    name={activity.name}
                    id={activity._id}
                    currentFavorites={this.props.currentFavorites}
                    editActivity={this.props.editActivity}
                    removeFromFavorite={this.props.removeFromFavorite}
                  />
                )}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default MyActivities;