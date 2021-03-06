import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';

class Login extends Component {

  state = { 
    username: "", 
    password: "" ,
    isError: false
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    axios.post("/api/login", { username, password })
      .then((resp) => {
        this.setState({ username: "", password: ""});
        this.props.updateCurrentUser(resp.data)
        this.props.history.push('/home');
      })
      .catch((err) => {
        this.setState({
          isError: true
        })
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
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered center">
            
              <figure className="image mb-2">
                <img style={{ maxWidth: "512px" }} alt="logo" src="images/CloudFinalDarktext.png" />
              </figure>
            </div>
            <div className="columns is-vcentered is-centered center">
              <form style={{ maxWidth: "512px" }} onSubmit={this.handleFormSubmit}>
              <h2 className="title is-4">Now just log in...</h2>
                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="e.g Anna Smith" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <p className="control">
                      <input className="input" type="password" placeholder="Password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                    </p>
                  </div>
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary mb-3">Submit</button>
                </div>
                <div><p>First time here?
                  <Link to="/signup"> Sign up</Link> </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(Login);
