import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { Link, Route } from 'react-router-dom';

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NewActivityForm from './components/createactivities/NewActivityForm';
import CreateTodoList from './components/CreateTodoList';
import AllActivities from './components/AllActivities';
import MyActivities from './components/MyActivities';
import StartGame from './components/StartGame'

class App extends Component {

  state = {
    currentUser: this.props.user.userDoc,
    currentFavorites: []
  }

  updateCurrentUser = (userObjFromBackend) => {
    this.setState({
      currentUser: userObjFromBackend
    })
  }

  logoutUser = () => {
    axios.post("/api/logout", {})
      .then((resp) => {
        this.setState({
          currentUser: null,
          currentFavorites: []
        });
      })
  }

  

  componentDidMount = () => {
    if (this.state.currentUser) {
      console.log(this.state.currentUser)
      axios.put(`/api/user/${this.state.currentUser._id}`)
      .then((response) => {
        this.setState({
          currentFavorites : response.data.bookmarkedActivities
        })
      })
    }
  }

  componentDidUpdate = () => {
    if (this.state.currentUser) {
    axios.put(`/api/user/${this.state.currentUser._id}`, 
              {bookmarkedActivities: this.state.currentFavorites})
    .then((response) => {
      console.log(response)
    })
    }
  }

  addToFavorite = (activityIDtoAdd, priorityToAdd) => {
    let newFavorites = this.state.currentFavorites.concat({activityID: activityIDtoAdd, isHighPriority: priorityToAdd})
    this.setState({
      currentFavorites: newFavorites
    })
  }

  removeFromFavorite = (activityIDToRemove) => {
    let filteredDeletionFavorites = this.state.currentFavorites.filter(activity => activity.activityID !== activityIDToRemove)
    this.setState({
      currentFavorites: filteredDeletionFavorites
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.currentUser ? (
          <div>
            <h1>Welcome, {this.state.currentUser.username}</h1>
            <button onClick={this.logoutUser}>Logout</button>
          </div>) : (
            <div>
              <h3>Signup</h3>
              <Signup></Signup>
              <hr></hr>
              <h3>Login</h3>
              <Login updateCurrentUser={this.updateCurrentUser}></Login>
            </div>
          )}
        <hr></hr>
        <StartGame user={this.state.currentUser} />

        <h1>Make Me Do</h1>
        <h2>A list of things we said we'd do tomorrow</h2>
        <div>
          <Link to="/make-me-do">Make me DO something</Link><br></br>
          <Link to="/activities">Browse activities</Link><br></br>
          <Link to="/add-activity">Create an Activity</Link><br></br>
          <Link to="/my-activities">My activities</Link><br></br>
        </div>
        <Route path="/make-me-do" component={CreateTodoList}></Route>
        <Route path="/activities" render={(props) => <AllActivities
          {...props} user={this.state.currentUser}
          addToFavorite={this.addToFavorite}
          removeFromFavorite={this.removeFromFavorite} 
          currentFavorites={this.state.currentFavorites}
          />}/>
        <Route path="/add-activity" render={(props) => <NewActivityForm
          {...props} user={this.state.currentUser}/>}/>
        <Route path="/my-activities" render={(props) => <MyActivities
          {...props} user={this.state.currentUser}
          addToFavorite={this.addToFavorite}
          removeFromFavorite={this.removeFromFavorite} 
          currentFavorites={this.state.currentFavorites}
          />}/>
      </div>
    );
  }
}

export default App;