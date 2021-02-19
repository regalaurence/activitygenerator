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
    let todoDescription = ""
    let todoUrl = ""
    //console.log(todo)

    if ("activity" in todo) {
      todoName = todo.activity.name
      todoTime = todo.activity.minDuration
      todoId = todo.activity._id
      todo.description ? todoDescription = todo.ativity.description : todoDescription = null
      todoUrl ? todoUrl = todo.activity.url : todoUrl = null
    } else {
      todoName = todo.name
      todoTime = todo.minDuration
      todoId = todo._id
      todo.description ? todoDescription = todo.description : todoDescription = null
      todoUrl ? todoUrl = todo.url : todoUrl = null
    }

    return (
      
      <div className="mb-4">
      <article>
        <input type="checkbox" checked={this.state.isChecked} id="todo-item" name={todoName} onChange={this.checkBoxHandler} />
        <strong> {todoName}</strong>
        <br></br><strong>Description:</strong> {todoDescription}
        <br></br><strong> Duration: </strong>{todoTime} mins
        </article>
      </div>
    )
  }
}

export default ToDoListItem;