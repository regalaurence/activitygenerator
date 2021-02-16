import React, { Component } from 'react';
//import axios from 'axios';
import CreateToDoList from './CreateTodoList';
import ToDoListForm from './ToDoListForm';
import {Redirect, Route, withRouter} from 'react-router-dom';

class MakeMeDo extends Component {

  state = {
    time: null,
    possibleCategories: [],
    // userActivitiesFromDb: this.props.user.bookmarkedActivities,
    // allActivitiesFromDb: []
  }

  handleFormSubmit = (userInputTime, userInputCategories) => {
    this.props.onChildStateUpdate(userInputTime, userInputCategories)
    this.setState({
      time: userInputTime,
      possibleCategories: userInputCategories
    })
  }

  render() {

    if (this.state.time === null || this.state.possibleCategories.length === 0) {
      return <ToDoListForm onFormSubmit={this.handleFormSubmit}></ToDoListForm>
    }

    return (
<<<<<<< HEAD
      <Redirect to="/your-todo-list"></Redirect>
      // <section className="hero">
      //   <div className="hero-body">
      //     <div className="container">
      //       <div className="columns is-vcentered is-centered">
      //         <form style={{ maxWidth: "612px" }}>
      //           <CreateToDoList user={this.props.user} availableTime={this.state.time} possibleCategories={this.state.possibleCategories}></CreateToDoList>
      //         </form>
      //       </div>
      //     </div>
      //   </div>
      // </section>
=======
      <section className="hero">
      <div className="hero-body">
        <div className="container ">
          <div className="columns is-vcentered is-centered center">
          <form style={{ maxWidth: "612px" }}>
      <CreateToDoList user={this.props.user} availableTime={this.state.time} possibleCategories={this.state.possibleCategories}></CreateToDoList>
      </form>
            </div>
          </div>
        </div>
      </section>
>>>>>>> master
    )
  }
}

export default withRouter(MakeMeDo);