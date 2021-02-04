import React, { Component } from 'react';
import axios from 'axios';

class MyActivities extends Component {

  state = {
    favoriteActivities: []
  }

  componentDidMount = () => {
    this.populateAcitivities()
  }

  populateAcitivities = () => {
    let promises = []
    let activitiesToPopulate = this.props.currentFavorites

    for (let i = 0; i < activitiesToPopulate.length; i++) {
      promises.push(axios.get(`/api/activities/${activitiesToPopulate[i].activityID}`)
      .then(response => {
        return {activity : response.data, isHighPriority: activitiesToPopulate[i].isHighPriority}
      })
      )
    }

    Promise.all(promises)
    .then((response) => {
      this.setState({
      favoriteActivities: response
    })
  })
  }

  render() {
    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">          
            <div className="columns is-vcentered is-centered">
              <figure className="image">
                <img style={{ maxWidth: "412px" }} src="images/Myactivities.png" />
              </figure>
            </div>
            <div className="columns is-multiline is-mobile">
        {this.state.favoriteActivities &&
          this.state.favoriteActivities.map(activity => <div className="column is-full has-text-centered">{activity.activity.name} || 
            {activity.isHighPriority ? <span> High priority</span> : <span> Low priority</span>} </div>
          )}
          </div>
          </div>
        </div>
      </section>
    )
  }
}

export default MyActivities;