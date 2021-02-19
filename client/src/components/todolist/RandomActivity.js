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
      <div className="hero-body">
<div className="container">
<div className="columns is-vcentered is-centered center">
<div className="box">
  <article className="media pb-2">
    <div class="media-right">
      <figure class="image is-128x128 mr-4">
        <img src="/images/Randomtodo.png" alt="logo" />
      </figure>
    </div>
    <div className="media-content">
      <div className="content">
        <p>
          <h3>Your Random Activity is... <br></br></h3><h3><strong>{randomActivity.name}!</strong></h3>
          <br></br>
          <strong>Duration:</strong> {randomActivity.minDuration} min <br></br>
          <strong>Description:</strong> {randomActivity.description}<br></br>
        </p>
      </div>
    </div>   
  </article>
</div>
</div>
</div>
</div>
    )
  }
}

export default RandomActivity;



