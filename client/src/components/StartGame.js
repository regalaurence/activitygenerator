import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
// import { Redirect } from 'react-router-dom'

import { withRouter } from 'react-router-dom'

class StartGame extends Component {
  constructor(props) {
    super(props); /////??????

    this.chosenPreferences = []

    this.state = {
      preferences: [
        { propositionOne: "Relax", propositionTwo: "Sport" },
        // { propositionOne: "Indoor", propositionTwo: "Outdoor" },
        // { propositionOne: "Early Bird", propositionTwo: "Late night life" },
        // { propositionOne: "Alone", propositionTwo: "Together" },
        // { propositionOne: "Create", propositionTwo: "Consume" },
        // { propositionOne: "Online", propositionTwo: "Offline" },
        // { propositionOne: "Tea", propositionTwo: "Coctail" }
      ],
    };
  }


  updatingUserPreferences = () => {
    const preferences = this.chosenPreferences;

    axios.put(`/api/user/${this.props.user._id}`, { preferences })
      .then(() => {
        this.setState({
          preferences: this.chosenPreferences
        })
        let user = this.props.user
        user.preferences = preferences
        this.props.updateUser(user)
        //this.props.history.push('/home');
      })
      .catch(error => console.log(error))
  }


  // creatingButtonsFunction needed
  creatingButtonsFunction = () => {
    return this.state.preferences.map(pref => {
      return (
        <div>
          <button key={pref.propositionOne} type="submit" onClick={this.pushToCategories} value={pref.propositionOne}>{pref.propositionOne}</button>
          <button key={pref.propositionTwo} type="submit" onClick={this.pushToCategories} value={pref.propositionTwo}>{pref.propositionTwo}</button>
        </div>
      )
    }
    )
  }


  pushToCategories = (event) => {

    let button = event.currentTarget
    this.chosenPreferences.push(button.value)
    console.log(this.chosenPreferences)

    if (this.chosenPreferences.length === 1) {
      this.setState({
        preferences: [{ propositionOne: "Indoor", propositionTwo: "Outdoor" }]
      })
    }

    if (this.chosenPreferences.length === 2) {
      this.setState({
        preferences: [{ propositionOne: "Early Bird", propositionTwo: "Late night life" }]
      })
    }

    if (this.chosenPreferences.length === 3) {
      this.setState({
        preferences: [{ propositionOne: "Alone", propositionTwo: "Together" }]
      })
    }

    if (this.chosenPreferences.length === 4) {
      this.setState({
        preferences: [{ propositionOne: "Create", propositionTwo: "Consume" }]
      })
    }

    if (this.chosenPreferences.length === 5) {
      this.setState({
        preferences: [{ propositionOne: "Online", propositionTwo: "Offline" }]
      })
    }

    if (this.chosenPreferences.length === 6) {
      this.setState({
        preferences: [{ propositionOne: "Tea", propositionTwo: "Coctail" }]
      })
    }

    if (this.chosenPreferences.length === 7) {
      return (this.updatingUserPreferences())
    }

  };










  // handleChange = () => {
  //   this.setState({ categories: chosenCategories });
  // }


  render() {

    return (
      <div>
        Choose one of the options to set your profile
        {this.creatingButtonsFunction()}
      </div>
    )
  }
}

export default withRouter(StartGame);