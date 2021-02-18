import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class MyActivities extends Component {

  state = {
    activityDetailsShown: false,
    clickedActivity: null,
  }

  removeFromFavorites = (event) => {
    this.props.removeFromFavorite(event.target.value)
    this.setState({
      isFavorite: false
    })
  }

  showActivityDetails = (event) => {
    this.setState({
      activityDetailsShown: true,
      clickedActivity: event.target.value,
    })
  }

  printDetails = (argActivity) => {
    let forDetail = [...this.props.currentFavorites]
    let foundActivity = forDetail.find(el => el._id === argActivity)
    return (<div className="column is-vcentered is-centered"><p>
      {foundActivity.description
        ? <span><strong>Description:</strong><br></br>{foundActivity.description}</span>
        : <span><strong>Description:</strong><br></br>Edit this activity to add the description</span>}<br></br>
        {foundActivity.url
        ? <span><strong>Url: </strong><a href={foundActivity.url}>{foundActivity.url}</a></span>
        : <span><strong>Url: </strong><br></br>Edit this activity to add the url</span>}<br></br>
      <strong>Duration:</strong> {foundActivity.minDuration}<br></br>
      {foundActivity.hasCost
        ? <span><strong>Cost:</strong> It's not for free</span>
        : <span><strong>Cost:</strong> It's for free!</span>}<br></br>
      {foundActivity.isHighPriority
        ? <span><strong>Priority:</strong> High</span>
        : <span><strong>Priority:</strong> Low</span>} </p></div>)
  }



  render() {


    
    return (

      // this.state.activityDetailsShown ?
      // <div><p>Checking here</p></div> :

      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered center">
              <figure className="image is-vcentered is-centered has-text-centered mb-6">
                <img style={{ maxWidth: "412px" }} src="images/Myactivities.png" />
              </figure>
            </div>
            <div className="columns is-multiline is-mobile center">
            <div className="content"><h4 className="has-text-centered">Your Favourites Activities:</h4></div>
              {this.props.currentFavorites &&
                this.props.currentFavorites.map(activity =>
                  <div className="column is-full has-text-centered">
                    <h1 className="activity-name"><strong>{activity.name}</strong></h1>
                    <button onClick={this.showActivityDetails} key={activity._id} value={activity._id} className="button is-small is-success mr-2">See details</button>
                    <Link to="/edit-activity"><button className="button is-small is-success is-outlined mr-2" value={activity._id} onClick={(event) => {this.props.editActivity(event.target.value)}}>Edit activity</button></Link>
                    <button className="button is-light is-small" value={activity._id} onClick={this.removeFromFavorites}>Remove</button>
                    {/* {activity.isHighPriority ? <span> High priority</span> : <span> Low priority</span>}  */}
                    {activity._id === this.state.clickedActivity ? <div className="columns is-multiline is-mobile">
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