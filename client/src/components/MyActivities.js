import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity.js'

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
      .then((response) => response.data))
    }

    Promise.all(promises)
    .then((response) => {
      console.log("CHECK THIS OUTTTTTTT: " + response)
      this.setState({
      favoriteActivities: response
    })
  })
  }

  render() {
    return (
      <div>
        {this.state.favoriteActivities &&
          this.state.favoriteActivities.map(activity => <li>{activity.name}</li>)}
      </div>
    )
  }
}

export default MyActivities;