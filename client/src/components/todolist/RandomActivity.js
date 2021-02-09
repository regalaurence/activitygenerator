import React, { Component } from 'react';
import axios from 'axios';

class RandomActivity extends Component {
  state = {
    activitiesFromDb: [],
    loading : true
  }

  componentDidMount() {
    axios.get("/api/activities")
      .then(response => {
        this.setState({ activitiesFromDb: response.data, loading: false })
        console.log("Response from backend for random activity: ", response.data)
      })
  }
  // Getting the random number
  getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Getting random activity from both - Users and allFromDb
  generateRandomActivity = () => {
    let allActivities = [...this.state.activitiesFromDb]
    let generatedActivityNumber = this.getRandomIntInclusive(0, allActivities.length)
    return (allActivities[generatedActivityNumber])

  }
  render() {

    if (this.state.loading) {
      return <div>Loading ... </div>
    }


    let randomActivity = this.generateRandomActivity()
    return (
      <div>{randomActivity.name}</div>
    )
  }
}

export default RandomActivity;