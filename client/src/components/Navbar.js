import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom'


class Navbar extends Component {

  state = {
    active: "navbar-menu"
  }


  toggleClass = () => {
    console.log("happens")
    console.log(this.state.active)
    if (this.state.active === "navbar-menu") {
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
    this.props.logoutUser();
    this.toggleClass();
  }


  checkRedirect = (event) => {

    console.log("Event: ", event.target)

    let target = event.target;
    let name = target.name;

    console.log("Name: ", name)

    if (window.innerWidth >= 1024) {
      this.props.history.push(`/${name}`)

    } else {

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
  }



  render() {

    console.log("History: ", this.props.history.location.pathname)
    console.log("User: ", this.props.currentUser)


    return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" as={Link} href="/home">
            <Link to="/home" className="has-text-grey-dark">
              <img src="images/MakeMeDo_textOnly_black.png" alt="logo" width="112" height="28" />
            </Link>
          </a>
          <a role="button" onClick={this.toggleClass} className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div id="navbarBasicExample" className={this.state.active}>
        {this.props.currentUser &&
          <div className="navbar-start">
            <a className="navbar-item" onClick={this.checkRedirect} name="home">
              {window.innnerWidth >= 1024
                ? <Link to="/home" className="has-text-grey-dark">Home</Link>
                : <Link name="home" to="/home" className="has-text-grey-dark">Home</Link>
              }
            </a>
            <div className="navbar-start">
              <a className="navbar-item" onClick={this.checkRedirect} name="make-me-do">
                {window.innnerWidth >= 1024
                  ? <Link to="/make-me-do" className="has-text-grey-dark">Do Something</Link>
                  : <Link name="make-me-do" to="/make-me-do" className="has-text-grey-dark">Do Something</Link>
                }
              </a>
            </div>
            <nav class="navbar" role="navigation" aria-label="dropdown navigation">
              <div className="navbar-item has-dropdown is-hoverable" >
                <a className="navbar-link">
                  Activities
            </a>
                <div className="navbar-dropdown is-right">
                  <a className="navbar-item" onClick={this.checkRedirect} name="activities">
                    {window.innnerWidth >= 1024
                      ? <Link to="/activities" className="has-text-grey-dark">Browse Activities</Link>
                      : <Link name="activities" to="/activities" className="has-text-grey-dark">Browse Activities</Link>
                    }
                  </a>
                  <a className="navbar-item" onClick={this.checkRedirect} name="my-activities">
                    {window.innnerWidth >= 1024
                      ? <Link to="/my-activities" className="has-text-grey-dark">My Activities</Link>
                      : <Link name="my-activities" to="/my-activities" className="has-text-grey-dark">My Activities</Link>
                    }
                  </a>
                  <a className="navbar-item" onClick={this.checkRedirect} name="add-activity">
                    {window.innnerWidth >= 1024
                      ? <Link to="/add-activity" className="has-text-grey-dark">Create Activities</Link>
                      : <Link name="add-activity" to="/add-activity" className="has-text-grey-dark">Create Activities</Link>
                    }
                  </a>
                </div>
              </div>
            </nav>
          </div>
        }
          <div className="navbar-end">
            <div className="navbar-item">
              {/* ANITA CHENGE HERE FOR USER PROFILE */}
              {/* {this.props.currentUser ? <a className="navbar-item" onClick={this.checkRedirect} name="user-profile">Your profile</a> : null} */}
              {this.props.currentUser ? <a className="button is-primary" ><Link to="/user-profile" className="button-is-light" onClick={this.checkRedirect} name="user-profile">Your profile</Link></a> : null}
              {/* OLD ONE
              {this.props.currentUser ? <div to="/make-me-do" className="has-text-grey-dark"><Link to="/user-profile" className="button-is-light" onClick={this.toggleClass}>Your profile</Link></div> : null} */}

            </div>
            <div className="navbar-item">
              <div className="buttons">
                {!this.props.currentUser ?
                  <a className="button is-primary" onClick={this.checkRedirect} name="signup">
                    <Link to="/signup" className="has-text-grey-dark" onClick={this.checkRedirect} name="signup">Sign up</Link>
                  </a> : null}

                {this.props.currentUser ? <a className="button is-light" onClick={this.handleLogOut}>
                  Log out</a> : <a className="button is-light">
                    <Link to="/login" className="button-is-light" onClick={this.checkRedirect} name="login">Log in</Link>
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

