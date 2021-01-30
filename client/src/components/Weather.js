import React, { Component } from 'react';
import axios from 'axios';

class Weather extends Component {

  state = {
    weatherFromDb: [],
  }

  componentDidMount() {
    axios.get("/api/weather")
      .then(response => {
        this.setState({ weatherFromDb: response.data })
        console.log("Response from backend: ", response.data)
      })
  }



  render() {
    return (
      <div>
        <h4>{this.state.weatherFromDb}</h4>
        <button>Save weatherFromDb</button>
      
      </div>
    )
  }
}

export default Weather;