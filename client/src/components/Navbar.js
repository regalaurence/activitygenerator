import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router-dom'


class Navbar extends Component {

handleLogOut = () => {
  this.props.logoutUser()
}

  render() {

    console.log("History: ", this.props.history.location.pathname)
    console.log("User: ", this.props.currentUser)


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
          <a className="navbar-item">
          {/* ANITA CHENGE HERE FOR USER PROFILE */}
              {this.props.currentUser ? <div to="/make-me-do" className="has-text-grey-dark"><Link to="/user-profile" className="button-is-light">Your profile</Link></div> : null}
            </a>
            <div className="navbar-item">
              <div className="buttons">
              {!this.props.currentUser ? 
                <a className="button is-primary">
                  <Link to="/signup" className="has-text-grey-dark">Sign up</Link>
                </a> : null}
                {/* PROBLEMS HERE PROBLEMS HERE PROBLEMS HERE PROBLEMS HERE */}
                {this.props.currentUser ? <a className="button is-light" onClick={this.handleLogOut}>
                  Log out</a> : <a className="button is-light">
                  <Link to="/login" className="button-is-light">Log in</Link>
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
