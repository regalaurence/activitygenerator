import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {

  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    axios.post("/api/login", { username, password })
      .then((resp) => {
        this.setState({ username: "", password: "" });
        this.props.updateCurrentUser(resp.data)
      })
  }

// Geolocation of user - checking if its available
  // componentDidMount() {
  //   if ("geolocation" in navigator) {
  //     console.log("Available");
  //   } else {
  //     console.log("Not Available");
  //   }
  // }

// getting the location

  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(function(position) {
  //     console.log("Latitude is :", position.coords.latitude);
  //     console.log("Longitude is :", position.coords.longitude);
  //   });
  // }



  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }





  render() {
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default Login;