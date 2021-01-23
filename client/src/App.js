import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import { Link, Route } from 'react-router-dom';

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AddActivity from './components/AddActivity';
import CreateTodoList from './components/CreateTodoList';
import AllActivities from './components/AllActivities';
import MyActivities from './components/MyActivities';

class App extends Component {

  state = {
    currentUser: this.props.user.userDoc
  }

  updateCurrentUser = (userObjFromBackend) => {
    this.setState({
      currentUser: userObjFromBackend
    })
  }

  logoutUser = () =>{
    axios.post("/api/logout", {})
      .then((resp) => {
        this.setState({
          currentUser: null
        });
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
        <h1>Make Me Do</h1>
        <h2>The things I said I'd do tomorrow</h2>
        <div>
        <Link to="/make-me-do">Make me DO something</Link><br></br>
        <Link to="/activities">Browse activities</Link><br></br>
        <Link to="/add-activity">Create an Activity</Link><br></br>
        <Link to="/my-activities">My activities</Link><br></br>
        </div>
        <Route path="/make-me-do" component={CreateTodoList}></Route>
        <Route path="/activities" component={AllActivities}></Route>
        <Route path="/add-activity" component={AddActivity}></Route>
        <Route path="/my-activities" component={MyActivities}></Route>
      </div>
    );
  }
}

export default App;