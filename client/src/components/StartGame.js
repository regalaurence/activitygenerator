import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.chosenPreferences = [];
    this.state = {
      preferences: [
        { propositionOne: ["Relax", "Relaxing"], propositionTwo: ["Sport", "Sports"] }
      ]
    };
  }


  updatingUserPreferences = () => {

    const preferences = this.chosenPreferences;
    axios.put(`/api/user/${this.props.user._id}`, { preferences })
      .then(() => {
        this.setState({
          preferences: this.chosenPreferences
        });
        let user = this.props.user
        user.preferences = this.chosenPreferences
        this.props.updateUser(user)
        //this.props.history.push('/home');
      })
      .catch(error => console.log(error))
  }



  // creatingButtonsFunction needed
  creatingButtonsFunction = () => {
    return this.state.preferences.map(pref => {
      return (
        <div className="buttons is-vcentered is-centered">
          <button className="button is-light" key={pref.propositionOne[0]} type="submit" onClick={this.pushToCategories} value={pref.propositionOne[1]}>{pref.propositionOne[0]}</button>
          <button className="button is-light" key={pref.propositionTwo[0]} type="submit" onClick={this.pushToCategories} value={pref.propositionTwo[1]}>{pref.propositionTwo[0]}</button>
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
        preferences: [{ propositionOne: ["Indoor", "Indoors"], propositionTwo: ["Outdoor", "Outdoors"] }]
      })
    }

    if (this.chosenPreferences.length === 2) {
      this.setState({
        preferences: [{ propositionOne: ["Gym", "Sports"], propositionTwo: ["Bathtube", "Relaxing"] }]
      })
    }

    if (this.chosenPreferences.length === 3) {
      this.setState({
        preferences: [{ propositionOne: ["Leave me alone", "Relaxing"], propositionTwo: ["Take me out", "Socializing"] }]
      })
    }

    if (this.chosenPreferences.length === 4) {
      this.setState({
        preferences: [{ propositionOne: ["Cleaning master", "Housework"], propositionTwo: ["Dust doesn't hurt", "Adventures"] }]
      })
    }

    if (this.chosenPreferences.length === 5) {
      this.setState({
        preferences: [{ propositionOne: ["Online", "Online"], propositionTwo: ["Offline", "Outside"] }]
      })
    }

    if (this.chosenPreferences.length === 6) {
      this.setState({
        preferences: [{ propositionOne: ["Tea", "Relaxing"], propositionTwo: ["Bungee jumping", "Adventures"] }]
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
              <h1 className="subtitle has-text-centered pb-5">Choose one of the options to create your profile</h1>
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
