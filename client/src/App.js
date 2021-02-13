import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';
import { Link, Redirect, Route, Switch, withRouter } from 'react-router-dom';

//Components
import Navbar from './components/Navbar'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NewActivityForm from './components/createactivities/NewActivityForm';
import CreateToDoList from './components/todolist/CreateTodoList';
import AllActivities from './components/AllActivities';
import MyActivities from './components/MyActivities';
import StartGame from './components/StartGame'
import MakeMeDo from './components/todolist/MakeMeDo';
import Home from './components/Home'
import Weather from './components/Weather'
import Welcome from './components/homepage/Welcome'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'
class App extends Component {

  state = {
    currentUser: this.props.user.userDoc,
    currentFavorites: this.props.user.userDoc ? this.props.user.userDoc.bookmarkedActivities : []
  }

  updateCurrentUser = (userObjFromBackend) => {
    this.setState({
      currentUser: userObjFromBackend,
      currentFavorites: userObjFromBackend ? userObjFromBackend.bookmarkedActivities : []
    })
  }

  logoutUser = () => {
    axios.post("/api/logout", {})
      .then((resp) => {
        this.updateCurrentUser(null)
        this.props.history.push('/login');
      })
  }

  componentDidUpdate = () => {
    if (this.state.currentUser) {
      axios.put(`/api/user/${this.state.currentUser._id}`,
        { bookmarkedActivities: this.state.currentFavorites })
        .then((response) => {
          console.log(response)
        })
    }
  }

  addToFavorite = (activityToAdd, priority) => {
    activityToAdd.isHighPriority = priority
    let newFavorites = [...this.state.currentFavorites, activityToAdd]
    this.setState({
      currentFavorites: newFavorites
    })
  }

  removeFromFavorite = (activityIDToRemove) => {
    let filteredDeletionFavorites = this.state.currentFavorites.filter(activity => activity._id !== activityIDToRemove)
    this.setState({
      currentFavorites: filteredDeletionFavorites
    })
  }


  checkPreferences = () => {
    if (this.state.currentUser.preferences.length === 0) {
      return <StartGame user={this.state.currentUser} updateUser={this.updateCurrentUser} />
    }
  }



  render() {

    console.log("Rendering App...")
    console.log(this.state.currentUser)
    console.log(!this.state.currentUser)

    return (
      <div className="App">
        <Navbar currentUser={this.state.currentUser} logoutUser={this.logoutUser} />
        {this.state.currentUser && this.checkPreferences()}
        {/* !this.state.currentUser && <Redirect to="/login"></Redirect> */}

        {/*  
        {this.state.currentUser && <StartGame user={this.state.currentUser} />} */}
        <Route exact path="/">
          {this.state.currentUser ? 
            <Home user={this.state.currentUser} /> :
          <Welcome/>
          }
        </Route>
        <Route path="/login">
          <Login updateCurrentUser={this.updateCurrentUser} />
        </Route>

        <Route path="/signup">
          <Signup user={this.state.currentUser} />
        </Route>

        <Switch>

          <Route path="/user-profile">
            <UserProfile user={this.state.currentUser} />
          </Route>

          <Route path="/make-me-do" render={() => (
            this.state.currentUser
              ? <MakeMeDo user={this.state.currentUser} />
              : <Redirect to='/login' />
          )} />

          <Route path="/home" render={() => (
            this.state.currentUser
              ? <Home user={this.state.currentUser} />
              : <Redirect to='/login' />
          )} />

          {/* <Route path="/weather" component={Weather} /> */}

          <Route path="/activities" render={(props) => (
            this.state.currentUser
              ? <AllActivities
                {...props} user={this.state.currentUser}
                addToFavorite={this.addToFavorite}
                removeFromFavorite={this.removeFromFavorite}
                currentFavorites={this.state.currentFavorites}
              />
              : <Redirect to='login' />)} />

          <Route path="/add-activity" render={(props) => (
            this.state.currentUser
              ? <NewActivityForm
                {...props} user={this.state.currentUser}
                addToFavorite={this.addToFavorite} />
              : <Redirect to='login' />
          )} />

          <Route path="/my-activities" render={(props) => (
            this.state.currentUser
              ? <MyActivities
                {...props} user={this.state.currentUser}
                addToFavorite={this.addToFavorite}
                removeFromFavorite={this.removeFromFavorite}
                currentFavorites={this.state.currentFavorites}
              />
              : <Redirect to='/login' />)} />

        </Switch>
        
        <Footer />
      </div>

    );
  }
}

export default withRouter(App);