import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'


class Navbar extends Component {

handleLogOut = () => {
  this.props.logoutUser()
}

  render() {
    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item">  
          <Link to="/home" className="has-text-grey-dark">
          <img src="images/MakeMeDo_textOnly_black.png" width="112" height="28" />
          </Link>
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">
              <Link to="/home" className="has-text-grey-dark">Home</Link>
            </a>

            <div className="navbar-start">
            <a className="navbar-item">
              <Link to="/make-me-do" className="has-text-grey-dark">Do Something</Link>
            </a>
            </div>

            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                Activities
            </a>

              <div className="navbar-dropdown">
              <a className="navbar-item">
              <Link to="/activities" className="has-text-grey-dark">Browse Activities</Link>
            </a>
            <a className="navbar-item">
              <Link to="/my-activities" className="has-text-grey-dark">My Activities</Link>
            </a>
            <a className="navbar-item">
              <Link to="/add-activity" className="has-text-grey-dark">Create Activities</Link>
            </a>
              </div>
            </div>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <Link to="/signup" className="has-text-grey-dark">Sign up</Link>
                  {/* <strong>Sign up</strong> */}
                </a>
                {/* PROBLEMS HERE PROBLEMS HERE PROBLEMS HERE PROBLEMS HERE */}
                {this.props.currentUser ? <a className="button is-light" onClick={this.handleLogOut}>
                  Log out</a> : <a className="button is-light">
                  Log in
              </a>}
              </div>
            </div>
          </div>
        </div>
      </nav>

    )
  }
}

export default withRouter(Navbar);
