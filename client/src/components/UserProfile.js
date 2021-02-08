import React, { Component } from 'react';
import axios from 'axios';

class UserProfile extends Component {
  newChosenPreferences = [];
  state = {
    username: "",
    // password: "",
    preferences: [],
    oldpreferences: [],
  }

  componentDidMount = () => {
    let user = this.props.user
    console.log(user.username)
    this.setState({
      username: user.username,
      preferences: [],
      oldpreferences: user.preferences
    })
  }

  updatingUserPreferences = () => {

    const preferences = this.newChosenPreferences;
    axios.put(`/api/user/${this.props.user._id}`, { preferences })
      .then(() => {
        this.setState({
          preferences: this.newChosenPreferences
        });
        let user = this.props.user
        user.preferences = this.newChosenPreferences
        this.props.updateUser(user)
        //this.props.history.push('/home');
      })
      .catch(error => console.log(error))
  }


  pushToCategories = (event) => {

    let button = event.currentTarget
    this.newChosenPreferences.push(button.value)
    console.log(this.chosenPreferences)

    if (this.newChosenPreferences > 7) {
      return  (<div className="column has-text-centered">
      <button className="button is-warning" key="submitNewPreferences" type="submit" onClick={this.updatingUserPreferences}>Save changes</button>
    </div>)
    }
  }



  creatingButtonsFunction = () => {
    let possiblePreferences = ["Sport", "Relax", "Indoor", "Outdoor", "Early Bird", "Late night life", "Alone", "Together", "Create", "Consume", "Online", "Offline", "Tea", "Coctail"];
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
          <h5 className="is-small">Your preferences: {this.state.oldpreferences}</h5></div>
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