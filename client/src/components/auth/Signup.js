import React, { Component } from 'react';
import axios from 'axios';
import { Link, withRouter } from 'react-router-dom';


class Signup extends Component {

  state = { username: "", password: "" };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const username = this.state.username;
    const password = this.state.password;

    axios.post("/api/signup", { username, password })
      .then(() => {
        this.setState({ username: "", password: "" });
        this.props.history.push('/login');
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
            <div className="columns is-vcentered is-centered center">

              <figure className="image">
                <img style={{ maxWidth: "512px" }} alt="logo" src="images/FinalLightPeach.png" />
              </figure>
            </div>
            <div className="columns is-vcentered is-centered center">
              <form style={{ maxWidth: "512px" }} onSubmit={this.handleFormSubmit}>
              <h2 className="title is-4 mt-1">Sign up</h2>
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
                    {/* <p className="control has-icons-left"> */}
                      <input className="input" type="password" placeholder="Password" name="password" value={this.state.password} onChange={e => this.handleChange(e)} />
                      {/* <span className="icon is-small is-left">
                        <i className="fas fa-lock"></i>
                      </span> */}
                    </p>
                  </div>
                </div>
                <div className="control">
                  <button type="submit" className="button is-primary mb-3" value="Submit">Submit</button>
                </div>
                <div>Already have an account?
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

export default withRouter(Signup);

