import React, { Component } from 'react';
import axios from 'axios';
// import 'bulma/css/bulma.css'
// import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Link, Route } from 'react-router-dom';
import Login from './Login';



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
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered">

              <figure className="image">
                <img style={{ maxWidth: "512px" }} src="images/CloudFinalDarkText.png" />
              </figure>
            </div>
            <div className="columns is-vcentered is-centered">
              <form style={{ maxWidth: "512px" }} onSubmit={this.handleFormSubmit}>

                <div className="field">
                  <label className="label">Username</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="e.g Anna Smith" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Password</label>
                  <div className="control">
                    <p class="control has-icons-left">
                      <input className="input" type="password" placeholder="Password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                      <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                      </span>
                    </p>
                  </div>
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary mb-3" value="Submit">Submit</button>
                </div>
                <div>Already have an account?
{/* <Route path="/login" component={Login}></Route> */}
                  <Link to="/login" updateCurrentUser={this.updateCurrentUser}> Log in</Link>
                
                  {/* <a href='/login'> Log in here</a> */}
                </div>
              </form>
            </div>
          </div>
        </div>


      </section>
    )
  }
}

export default Signup;


{/* <form onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input type="text" name="username" value={this.state.username} onChange={e => this.handleChange(e)} />
          <label>Password:</label>
          <input type="password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
          <input type="submit" value="Submit" />
        </form> */}
