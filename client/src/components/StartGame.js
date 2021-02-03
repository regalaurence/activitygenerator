import React, { Component } from 'react';
import axios from 'axios';
import Home from './Home';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.chosenPreferences = [];
    this.state = {
      preferences: [
        { propositionOne: "Relax", propositionTwo: "Sport" }
      ]
    };
  }


  updatingUserPreferences = () => {
    
    const preferences = this.chosenPreferences;
    axios.put(`/api/user/${this.props.user._id}`, { preferences })
      .then(() => {
        this.setState({
          preferences: this.chosenPreferences
        })
       
        this.props.history.push('/home');
      })
      .catch(error => console.log(error))
  }



  // creatingButtonsFunction needed
  creatingButtonsFunction = () => {
    return this.state.preferences.map(pref => {
      return (
        <div className="buttons is-vcentered is-centered">
          <button className="button is-light" key={pref.propositionOne} type="submit" onClick={this.pushToCategories} value={pref.propositionOne}>{pref.propositionOne}</button>
          <button className="button is-light" key={pref.propositionTwo} type="submit" onClick={this.pushToCategories} value={pref.propositionTwo}>{pref.propositionTwo}</button>
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

  render() {

    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <h1 className="subtitle has-text-centered pb-5">Choose one of the options to set your profile</h1>
            </div>
            <div className="columns is-vcentered is-centered">
              {this.creatingButtonsFunction()}
            </div>
            <div className="columns is-vcentered is-centered">
              <figure className="image">
                <img style={{ maxWidth: "512px" }} src="images/thinking_girl_with_plants.png" />
              </figure>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
export default withRouter(StartGame);
