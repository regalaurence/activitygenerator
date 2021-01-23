import React, { Component } from 'react';
import axios from 'axios'
import './App.css';

//Components
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import AddActivity from './components/AddActivity';

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
        <AddActivity />
      </div>
    );
  }
}

export default App;