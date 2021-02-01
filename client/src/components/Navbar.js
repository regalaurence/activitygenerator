import React, { Component } from 'react';
//import 'bulma/css/bulma.css'
//import 'react-bulma-components/dist/react-bulma-components.min.css';
import { Link } from 'react-router-dom';

class Navbar extends Component {
  render() {

    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="http://localhost:3000/">
          <img src="images/MakeMeDo_textOnly_black.png" width="112" height="28"/>
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
            Home
          </a>
    
          <a className="navbar-item">
            My Activities
          </a>
    
          <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              Make me do!
            </a>
    
            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
              </a>
              <a className="navbar-item">
                Jobs
              </a>
              <a className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider"/>
              <a className="navbar-item">
                Report an issue
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
              <a className="button is-light" onClick={this.logoutUser}> 
                Log out
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    
    )
  }
}

export default Navbar;