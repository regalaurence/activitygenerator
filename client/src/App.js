import React, { Component } from 'react';
import axios from 'axios'
import './App.scss';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';

//Components
import Navbar from './components/Navbar'
import Signup from './components/auth/Signup';
import Login from './components/auth/Login';
import NewActivityForm from './components/createactivities/NewActivityForm';
import AllActivities from './components/activities/AllActivities';
import MyActivities from './components/activities/MyActivities';
import StartGame from './components/StartGame'
import MakeMeDo from './components/todolist/MakeMeDo';
import Home from './components/Home'
import Welcome from './components/homepage/Welcome'
import Footer from './components/Footer'
import UserProfile from './components/UserProfile'
import RandomActivity from 'components/todolist/RandomActivity';
import CreateToDoList from 'components/todolist/CreateTodoList';
import EditActivity from 'components/createactivities/EditActivity';
class App extends Component {

  state = {
    currentUser: this.props.user.userDoc,
    currentFavorites: this.props.user.userDoc ? this.props.user.userDoc.bookmarkedActivities : [],
    timeForTodoList: 0,
    categoriesForTodoList: [],
    activityToChangeID: null
  }

  updateCurrentUser = (userObjFromBackend) => {
    this.setState({
      currentUser: userObjFromBackend,
      currentFavorites: userObjFromBackend ? userObjFromBackend.bookmarkedActivities : [],
    })
  }

  logoutUser = () => {
    axios.post("/api/logout", {})
      .then((resp) => {
        this.updateCurrentUser(null)
        this.props.history.push('/login');
      })
  }

  editActivity = (activityID) => {
    this.setState({
      activityToChangeID: activityID
    })
  }

  addToFavorite = (activityToAdd, priority) => {
    activityToAdd.isHighPriority = priority
    let newFavorites = [...this.state.currentFavorites, activityToAdd]
    axios.put(`/api/user/${this.state.currentUser._id}`,
        { bookmarkedActivities: newFavorites })
    .then ((response) => {
          console.log(response)
        })
    .then(() => {
      this.setState({
      currentFavorites: newFavorites
    })
  })
}

  removeFromFavorite = (activityIDToRemove) => {
    let filteredDeletionFavorites = this.state.currentFavorites.filter(activity => activity._id !== activityIDToRemove)
    axios.put(`/api/user/${this.state.currentUser._id}`,
        { bookmarkedActivities: filteredDeletionFavorites })
    .then ((response) => {
          console.log(response)
        })
    .then(() => {
      this.setState({
      currentFavorites: filteredDeletionFavorites
    })
  })
}

  handleChildStateUpdate = (time, categories) => {
    this.setState({
      timeForTodoList: time,
      categoriesForTodoList: categories
    })
  }

  render() {

    return (
      <div className="App">
        <Navbar currentUser={this.state.currentUser} logoutUser={this.logoutUser} />

        <Route exact path="/">
          {this.state.currentUser ?
            <Home user={this.state.currentUser} /> :
            <Welcome />
          }
        </Route>

        <Route path="/login">
          <Login updateCurrentUser={this.updateCurrentUser} />
        </Route>

        <Route path="/signup">
          <Signup user={this.state.currentUser} />
        </Route>

        <Switch>

          <Route path="/start-game">
            <StartGame user={this.state.currentUser} updateUser={this.updateCurrentUser} />
          </Route>

          <Route path="/user-profile">
            {this.state.hasPreferences ? <StartGame user={this.state.currentUser} updateUser={this.updateCurrentUser} />
            :
            <UserProfile user={this.state.currentUser} />
            }
          </Route>

          <Route path="/make-me-do" render={() => (
            this.state.currentUser
              ? <MakeMeDo user={this.state.currentUser} onChildStateUpdate={this.handleChildStateUpdate} />
              : <Redirect to='/login' />
          )} />

          <Route path="/your-todo-list">
            <CreateToDoList user={this.props.user} timeForTodoList={this.state.timeForTodoList} categoriesForTodoList={this.state.categoriesForTodoList} removeFromFavorite={this.removeFromFavorite}></CreateToDoList>
          </Route>


          {/* <Route path="/your-todo-list" render={() => (
            this.state.currentUser
              ? <CreateToDoList user={this.props.user} timeForTodoList={this.state.timeForTodoList} categoriesForTodoList={this.state.categoriesForTodoList}></CreateToDoList>
              : <Redirect to='/login' />
          )} /> */}

          <Route path="/home" render={() => (
            this.state.currentUser
              ? this.state.currentUser.preferences.length > 0 ? <Home user={this.state.currentUser} />
              : <Redirect to='/start-game' />
              : <Redirect to='/login' />
          )} />

          <Route path="/random-activity" render={() => (
            this.state.currentUser
              ? <RandomActivity />
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
          <Route path="/edit-activity" render={(props) => (
            this.state.currentUser
              ? <EditActivity
                {...props} user={this.state.currentUser}
                currentFavorites={this.state.currentFavorites}
                editActivity={this.editActivity}
                activityToChangeID={this.state.activityToChangeID}
                updateUser={this.updateCurrentUser}
              />
              : <Redirect to='/login' />)} />
          <Route path="/my-activities" render={(props) => (
            this.state.currentUser
              ? <MyActivities
                {...props} user={this.state.currentUser}
                addToFavorite={this.addToFavorite}
                removeFromFavorite={this.removeFromFavorite}
                currentFavorites={this.state.currentFavorites}
                editActivity={this.editActivity}
              />
              : <Redirect to='/login' />)} />

        </Switch>

        <Footer />
      </div>

    );
  }
}

export default withRouter(App);

