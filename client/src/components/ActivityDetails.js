import React, { Component } from 'react';
import "bulma";

class ActivityDetails extends Component {

  state = {
    favoriteActivities: this.props.currentFavorites
  }

  render() {
    return (


      
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <figure className="image is-vcentered is-centered has-text-centered mb-6">
                <img style={{ maxWidth: "412px" }} src="images/Myactivities.png" />
              </figure>
            </div>
            <div className="columns is-multiline is-mobile">
              {this.state.favoriteActivities &&
                this.state.favoriteActivities.map(activity => <div className="column is-full has-text-centered">{activity.name} ||
            {activity.isHighPriority ? <span> High priority</span> : <span> Low priority</span>} </div>
                )}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ActivityDetails;