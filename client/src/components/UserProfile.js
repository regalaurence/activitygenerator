import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
  //newChosenPreferences = [];
  state = {
    username: "",
    // password: "",
    preferences: [],
  }



  componentDidMount = () => {
    let user = this.props.user
    console.log(user.username)
    this.setState({
      username: user.username,
      preferences: user.preferences,

    })
  }

  updatingUserPreferences = (newPreferences) => {
    //const newPreferences = this.newChosenPreferences;
    // const newPreferences = [...this.state.preferences, this.newChosenPreferences];
    axios.put(`/api/user/${this.props.user._id}`, { preferences: newPreferences })
      .then(() => {
        this.setState({
          preferences: newPreferences
        });
        let user = this.props.user
        user.preferences = this.newChosenPreferences
        this.props.updateUser(user)
        //this.props.history.push('/home');
      })
      .catch(error => console.log(error))
  }


  pushToCategories = (event) => {
    let newChosenPreferences = [...this.state.preferences]
    let chosenActivity = event.currentTarget.value
    if (!newChosenPreferences.includes(chosenActivity)) {
      newChosenPreferences.push(chosenActivity)
      // console.log(this.newChosenPreferences)
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
        <div className="column has-text-centered is-one-quarter-mobile is-one-quarter-tablet is-one-quarter-desktop is-one-quarter-widescreen is-one-quarter-fullhd">
          <button className="button is-primary" key={pref} type="submit" onClick={this.pushToCategories} value={pref}>{pref}</button>
        </div>)
    }
    )
  }

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div className="is-vcentered is-centered">
                <div className="content has-text-centered">
                  <h2 className="is-small">Username: {this.state.username}</h2></div>
                <div className="content has-text-centered">
                  <h5 className="is-small">Your preferences: </h5> {this.state.preferences.map(pref => {
                    return <p>{pref}</p>
                  })}

                </div>
                <div className="columns is-multiline is-vcentered is-centered has-text-centered">
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