import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class UserProfile extends Component {
  state = {
    username: "",
    preferences: [],
  }

  componentDidMount = () => {
    let user = this.props.user
    console.log(user.username)
    this.setState({
      username: user.username,
      preferences: user.preferences
    })
  }

  updatingUserPreferences = (newPreferences) => {
    axios.put(`/api/user/${this.props.user._id}`, { preferences: newPreferences })
      .then(() => {
        this.setState({
          preferences: newPreferences
        });
        let user = this.props.user;
        user.preferences = newPreferences;
        this.props.updateUser(user);
      })
      .catch(error => console.log(error))
  }


  pushToCategories = (event) => {
    let newChosenPreferences = [...this.state.preferences]
    let chosenActivity = event.currentTarget.value
    if (!newChosenPreferences.includes(chosenActivity)) {
      newChosenPreferences.push(chosenActivity)
    }
    else {
     let filteredPreferences = newChosenPreferences.filter(activity => activity !== chosenActivity)
     newChosenPreferences = filteredPreferences;
    }

    if (newChosenPreferences.length >= 1) {
      this.updatingUserPreferences(newChosenPreferences)
    }
  }


  creatingButtonsFunction = () => {
    let possiblePreferences = ["Sports", "Relaxing", "Indoors", "Housework", "Socializing", "Adventures", "Outdoors", "Online",];
    return possiblePreferences.map(pref => {
      return (
        <div className="column is-one-third-mobile has-text-centered is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd has-text-centered">
        <button id="categories" className={this.state.preferences.includes(pref) ? "btn-selected" : "btn-not-selected"} key={pref} type="submit" onClick={this.pushToCategories} value={pref}>
        <figure className="image is-vcentered is-centered">
            <img id="categories" className="image" key={pref} name={pref} style={{ maxWidth: "180px" }} src={"images/" + pref + ".png"} />
          </figure>
          </button><br />{pref}
        </div>      
        )
    }
    )
  }

  render() {

let uniquePreferences = [...new Set(this.state.preferences)]; 

    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered center">
              <div className="is-vcentered is-centered">
                <div className="content has-text-centered">
                  <h2 className="is-small">Hello {this.state.username}!</h2>
                  <Link to="/my-activities"> <button className="button is-warning is-small">My Activities</button></Link>
                  </div>
                <div className="content has-text-centered">
                  <h5 className="is-small">Your preferences are: </h5> <div className="tags is-centered">{uniquePreferences.map(pref => {
                    return <span className="tag is-white">{pref}</span> 
                  })}</div>
                  <div className="content has-text-centered mt-4">
                  <h5 className="is-small">Tap on the images below to updated your preferences:</h5></div>
                </div>
                <div className="columns is-multiline is-mobile">
                  {this.creatingButtonsFunction()}
                </div>
                {/* <div className="column has-text-centered">
        <button className="button is-warning" key="submitNewPreferences" type="submit" onClick={this.updatingUserPreferences}>Save changes</button>
      </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserProfile;
