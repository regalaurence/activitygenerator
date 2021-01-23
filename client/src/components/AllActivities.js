import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity.js'

class AllActivities extends Component {

  state = {
    activitiesFromDb: []
  }

  componentDidMount() {
    axios.get("/api/activities")
    .then(response => {
      console.log("Response from backend: ", response.data)
      this.setState({activitiesFromDb: response.data})
    })
}

  render() {
    console.log(this.state.activitiesFromDb)
    return (
      <div>
        <h3>All Activities</h3>
        {this.state.activitiesFromDb.map(activity => <Activity activity={activity} />)}
      </div>
    )
  }
}

export default AllActivities;