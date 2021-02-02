import React, { Component } from 'react';
import axios from 'axios';
import 'bulma/css/bulma.css'

class Signup extends Component {

  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    axios.post("/api/signup", { username, password })
      .then(() => {
        this.setState({ username: "", password: "" });
      })
  }

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

export default Signup;