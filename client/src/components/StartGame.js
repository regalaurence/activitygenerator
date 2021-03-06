import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class StartGame extends Component {
  constructor(props) {
    super(props);
    this.chosenPreferences = [];
    this.state = {
      preferences: [
        { propositionOne: ["A series and chill", "Relaxing"], propositionTwo: ["Jump around", "Sports"] }
      ]
    };
  }


  updatingUserPreferences = () => {

    console.log("prevented default")
    const preferences = this.chosenPreferences;
    axios.put(`/api/user/${this.props.user._id}`, { preferences })
      .then((respond) => {
        console.log("response", respond)
        // this.setState({
        //   preferences: this.chosenPreferences, 
        //   preferences: [{ propositionOne: ["Indoor", "Indoors"], propositionTwo: ["Outdoor", "Outdoors"] }]

        // });
        let user = this.props.user
        user.preferences = this.chosenPreferences
        this.props.updateUser(user)
        this.props.history.push('/home');
      })
      .catch(error => console.log("function problems here" + error))
  }



  // creatingButtonsFunction needed
  creatingButtonsFunction = () => {
    return this.state.preferences.map(pref => {
      return (
        <div className="buttons is-vcentered is-centered">
          <button className="button is-light" key={pref.propositionOne[0]} onClick={this.pushToCategories} value={pref.propositionOne[1]}>{pref.propositionOne[0]}</button>
          <button className="button is-light" key={pref.propositionTwo[0]} onClick={this.pushToCategories} value={pref.propositionTwo[1]}>{pref.propositionTwo[0]}</button>
        </div>
      )
    }
    )
  }


  pushToCategories = (event) => {

    let button = event.currentTarget
    this.chosenPreferences.push(button.value)

    if (this.chosenPreferences.length === 1) {
      this.setState({
        preferences: [{ propositionOne: ["Home sweet home", "Indoors"], propositionTwo: ["Into the wild", "Outdoors"] }]
      })
    }

    if (this.chosenPreferences.length === 2) {
      this.setState({
        preferences: [{ propositionOne: ["Fifteen burpees", "Sports"], propositionTwo: ["A foamy bathtub", "Relaxing"] }]
      })
    }

    if (this.chosenPreferences.length === 3) {
      this.setState({
        preferences: [{ propositionOne: ["Leave me alone", "Relaxing"], propositionTwo: ["Let's meet up", "Socializing"] }]
      })
    }

    if (this.chosenPreferences.length === 4) {
      this.setState({
        preferences: [{ propositionOne: ["Cleaning master", "Housework"], propositionTwo: ["Dust doesn't bite", "Adventures"] }]
      })
    }

    if (this.chosenPreferences.length === 5) {
      this.setState({
        preferences: [{ propositionOne: ["WiFi code please", "Online"], propositionTwo: ["Disconnect me", "Outside"] }]
      })
    }

    if (this.chosenPreferences.length === 6) {
      this.setState({
        preferences: [{ propositionOne: ["Cup of tea", "Relaxing"], propositionTwo: ["Bungee jumping", "Adventures"] }]
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
          <div className="columns is-vcentered is-centered center">
              <h1 className="subtitle has-text-centered pb-5">Let's get to know each other! Tap the button that sounds the most like you.</h1>
            </div>
            <div className="column is-vcentered is-centered center">
              {this.creatingButtonsFunction()}
              </div>
              <div className="columns is-vcentered is-centered center">
              <figure className="image">
                <img style={{ maxWidth: "412px" }} src="images/thinking_girl_with_plants.png" />
              </figure>
            
          </div>
        </div>
        </div>
      </section>
    )
  }
}
export default withRouter(StartGame);
