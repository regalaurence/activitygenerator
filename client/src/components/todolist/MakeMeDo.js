import React, { Component } from 'react';
import ToDoListForm from './ToDoListForm';
import {Redirect, withRouter} from 'react-router-dom';

class MakeMeDo extends Component {

  state = {
    time: null,
    possibleCategories: [],
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
      <Redirect to="/your-todo-list"></Redirect>
    )
  }
}

export default withRouter(MakeMeDo);