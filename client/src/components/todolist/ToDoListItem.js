import React, { Component } from 'react';

class ToDoListItem extends Component {

  state = {
    isChecked: false
  }

  renderTodoList = (todos) => {
    console.log("calling render todo list")
    return todos.map(todo => {
      if (todo.isHighPriority !== undefined) {
        return <li>{todo.activity.name}</li>
      } else {
        return <li>{todo.name}</li>
      }
    })
  }

  checkBoxHandler = (event) => {
    console.log("Event: ", event)
    if (this.state.isChecked === false) {
      this.setState({
        isChecked: true
      })
    } else {
      this.setState({
        isChecked: false
      })
    }
    this.props.onCheck(event.target.id, event.target.checked)
  }

  render() {

    let todo = this.props.todo
    let todoName = ""
    let todoTime = 0
    let todoId = ""
    //console.log(todo)

    if ("activity" in todo) {
      todoName = todo.activity.name
      todoTime = todo.activity.minDuration
      todoId = todo.activity._id
    } else {
      todoName = todo.name
      todoTime = todo.minDuration
      todoId = todo._id
    }

    return (
      
      <div>
        <input type="checkbox" checked={this.state.isChecked} id={todoId} name={todoName} onChange={this.checkBoxHandler} />
        {todoName}
        {todoTime} mins
      </div>
    )
  }
}

export default ToDoListItem;