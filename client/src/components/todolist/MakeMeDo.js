import React, { Component } from 'react';
//import axios from 'axios';
import ToDoListInput from './ToDoListInput';
import CreateToDoList from './CreateTodoList';

class MakeMeDo extends Component {
  
  state = {
    time: null,
    possibleCategories: [],
    // userActivitiesFromDb: this.props.user.bookmarkedActivities,
    // allActivitiesFromDb: []
  }

  handleFormSubmit = (userInputTime, userInputCategories) => {
    this.setState({
      time: userInputTime,
      possibleCategories: userInputCategories
    })
  }

  render() {

    if (this.state.time === null || this.state.possibleCategories.length === 0) {
      return <ToDoListInput onFormSubmit={this.handleFormSubmit}></ToDoListInput>
    }

    return (
      <CreateToDoList user={this.props.user} availableTime={this.state.time} possibleCategories={this.state.possibleCategories}></CreateToDoList>
    )
  }
}

export default MakeMeDo;