import React, { Component } from 'react';
import axios from 'axios';

class MyActivities extends Component {

  state = {
    favoriteActivities: this.props.currentFavorites,
    activityDetailsShown: false,
    clickedActivity: null,
    chosenOne: null
  }


  showActivityDetails = (event) => {


    this.setState({
      favoriteActivities: this.props.currentFavorites,

      activityDetailsShown: true,
      clickedActivity: event.target.value,
      chosenOne: null
    })
  }

  printDetails = (argActivity) => {
    let forDetail = [...this.state.favoriteActivities]
    let foundActivity = forDetail.find(el => el._id === argActivity)
    return (<div className="column is-vcentered is-centered"><p>
      {foundActivity.description ? <span><strong>Description:</strong><br></br>{foundActivity.description}</span> : <span><strong>Description:</strong><br></br>Edit this activity to add the description</span>}<br></br>
      <strong>Duration:</strong> {foundActivity.minDuration}<br></br>
      {foundActivity.hasCost ? <span><strong>Cost:</strong> It's not for free</span> : <span><strong>Cost:</strong> It's for free!</span>}<br></br>
      {foundActivity.isHighPriority ? <span><strong>Priority:</strong> High</span> : <span><strong>Priority:</strong> Low</span>} </p></div>)
  }



  render() {


    return (

      // this.state.activityDetailsShown ?
      // <div><p>Checking here</p></div> :

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
                this.state.favoriteActivities.map(activity =>
                  <div className="column is-full has-text-centered">
                  <h1 className="activity-name"><strong>{activity.name}</strong></h1>
                  <button onClick={this.showActivityDetails} key={activity._id} value={activity._id} className="button is-small is-success is-outlined">See details</button>
                  <button className="button is-light is-small" onClick={this.toggleFavoritesHandler}>Remove from My Activties</button>
                    {/* {activity.isHighPriority ? <span> High priority</span> : <span> Low priority</span>}  */}
                    {activity._id == this.state.clickedActivity ? <div className="columns is-multiline is-mobile">
                      {this.printDetails(this.state.clickedActivity)}

                    </div> : <p></p>}
                  </div>
                )}
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default MyActivities;