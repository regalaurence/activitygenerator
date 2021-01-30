import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { Link, Route } from 'react-router-dom';

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AddActivity from './components/createactivities/NewActivityForm';
import CreateTodoList from './components/CreateTodoList';
import AllActivities from './components/AllActivities';
import MyActivities from './components/MyActivities';
import StartGame from './components/StartGame'
import Home from './components/Home'
import Weather from './components/Weather'

class App extends Component {

  state = {
    currentUser: this.props.user.userDoc
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
          currentUser: null
        });
      })
  }


  showStartGame = () => {
    if (this.state.currentUser) {
      let prefs = this.state.currentUser.preferences
      if (prefs.length === 0) {
        return <div>
          <StartGame user={this.state.currentUser} updateUser={this.updateCurrentUser} />
        </div>
      }else{
        return <Home />
      }
    }
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
        {this.showStartGame()}
        {/* <StartGame user={this.state.currentUser} /> */}


        <h1>Make Me Do</h1>
        <h2>A list of things we said we'd do tomorrow</h2>
        <div>
          <Link to="/make-me-do">Make me DO something</Link><br></br>
          <Link to="/activities">Browse activities</Link><br></br>
          <Link to="/add-activity">Create an Activity</Link><br></br>
          <Link to="/my-activities">My activities</Link><br></br>
          <Link to="/home">Home</Link><br></br>
        </div>
        <Route path="/make-me-do" component={CreateTodoList}></Route>
        <Route path="/activities" component={AllActivities}></Route>
        <Route path="/add-activity" component={AddActivity}></Route>
        <Route path="/my-activities" component={MyActivities}></Route>
        <Route path="/home" component={Home}></Route>
        <Route path="/weather" component={Weather}></Route>
      </div>
    );
  }
}

export default App;