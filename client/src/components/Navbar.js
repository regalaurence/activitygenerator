import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter, Redirect } from 'react-router-dom'


class Navbar extends Component {
  
    state = {
      active: "navbar-menu"
    }
  

  toggleClass = () => {
    console.log("happens")
    console.log(this.state.active)
    if (this.state.active == "navbar-menu") {
      return this.setState({
        active: "navbar-menu is-active"
      })
    }
    else {
      return this.setState({
        active: "navbar-menu"
      })
    }
  }


  handleLogOut = () => {
    this.props.logoutUser()
  }


  checkRedirect = (event) =>{
    
    let target = event.target;
    let name = target.name;
    console.log(name);
    console.log("happens two")
    console.log(this.state.active)
    if (this.state.active == "navbar-menu is-active") {
      return this.setState({
        active: "navbar-menu"
      }, this.props.history.push(`/${name}`))
    }
    else {
      return this.setState({
        active: "navbar-menu"
      })
    }
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

          <a role="button" onClick={this.toggleClass} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">


            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>

        </div>


        {/* <input type="checkbox" id="nav-toggle-state" /> */}


        <div id="navbarBasicExample" className={this.state.active}>
          <div className="navbar-start">
            <a className="navbar-item" onClick={this.checkRedirect} name="home">
              <Link to="/home" className="has-text-grey-dark">Home</Link>
            </a>

            <div className="navbar-start">
              <a className="navbar-item" onClick={this.checkRedirect} name="make-me-do">
                <Link to="/make-me-do" className="has-text-grey-dark" onClick={this.toggleClass}>Do Something   </Link>
              </a>
            </div>

      

<nav class="navbar" role="navigation" aria-label="dropdown navigation">
            <div className="navbar-item has-dropdown is-hoverable" >
              <a className="navbar-link">
                Activities
            </a>
              <div className="navbar-dropdown is-right">
                <a className="navbar-item" onClick={this.checkRedirect} name="activities">
                  <Link to="/activities" className="has-text-grey-dark" onClick={this.toggleClass}>Browse Activities</Link>
                </a>
                <a className="navbar-item" onClick={this.checkRedirect} name="my-activities">
                  <Link to="/my-activities" className="has-text-grey-dark" onClick={this.toggleClass}>My Activities</Link>
                </a>
                <a className="navbar-item" onClick={this.checkRedirect} name="add-activity">
                  <Link to="/add-activity" className="has-text-grey-dark" onClick={this.toggleClass}>Create Activities</Link>
                </a>
              </div>
            </div>
</nav> 

          </div>

          <div className="navbar-end">
            <a className="navbar-item">
              {/* ANITA CHENGE HERE FOR USER PROFILE */}
              {this.props.currentUser ? <div to="/make-me-do" className="has-text-grey-dark"><Link to="/user-profile" className="button-is-light" onClick={this.toggleClass}>Your profile</Link></div> : null}
            </a>
            <div className="navbar-item">
              <div className="buttons">
                {!this.props.currentUser ?
                  <a className="button is-primary">
                    <Link to="/signup" className="has-text-grey-dark" onClick={this.toggleClass}>Sign up</Link>
                  </a> : null}

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
