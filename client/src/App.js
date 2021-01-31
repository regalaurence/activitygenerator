import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { Link, Route } from 'react-router-dom';
import 'bulma/css/bulma.css'

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NewActivityForm from './components/createactivities/NewActivityForm';
//import CreateTodoList from './components/todolist/CreateTodoList';
import AllActivities from './components/AllActivities';
import MyActivities from './components/MyActivities';
import StartGame from './components/StartGame'
import MakeMeDo from './components/todolist/MakeMeDo';
import Home from './components/Home'
import Weather from './components/Weather'

class App extends Component {

  state = {
    currentUser: this.props.user.userDoc,
    currentFavorites: this.props.user.userDoc ? this.props.user.userDoc.bookmarkedActivities : []
  }

  updateCurrentUser = (userObjFromBackend) => {
    this.setState({
      currentUser: userObjFromBackend,
      currentFavorites: userObjFromBackend.bookmarkedActivities
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

  componentDidUpdate = () => {
    if (this.state.user) {
    axios.put(`/api/user/${this.statee.user._id}`, 
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
          <Link to="/my-todo-list">My ToDo List (just for testing purpose)</Link>
        </div>
        <Route path="/make-me-do"><MakeMeDo user={this.state.currentUser}/></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/weather" component={Weather}></Route>
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
          {/* <Route path="/my-todo-list"> <CreateToDoList availableTime={120} possibleCategories={["Relaxing", "Housework"]}  /></Route> */}
      </div>
    );
  }
}

export default App;