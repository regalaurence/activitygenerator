import React, { Component } from 'react';
import axios from 'axios';
import "bulma";

class Weather extends Component {

  state = {
    weatherFromDb: null,
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      const values =position.coords
      console.log(values.latitude); // lat
      console.log(values.longitude); // lon
      
      axios.get('/api/weather/?lat=' + Math.round(values.latitude) + '&lon=' + Math.round(values.longitude) +'&units=metric')
        .then(response => {
          this.setState({ weatherFromDb: response.data })
          console.log("Response from backend: ", response.data)
        })
    });
  }

//// IMPORTANT FUNCTION DONT DELETE DURING MERGING 
// componentDidMount() {
//   navigator.geolocation.getCurrentPosition(function(position) {
//     console.log("Latitude is :", position.coords.latitude);
//     console.log("Longitude is :", position.coords.longitude);
//   });
// }

  render() {
    if (!this.state.weatherFromDb) {
      return "loading ..."
    }
    return (
      <div>
        <p>{this.state.weatherFromDb.main.temp}C</p>

      </div>
    )
  }
}

export default Weather;