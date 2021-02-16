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

  checkBoxHandler = () => {
    if (this.state.isChecked === false) {
      this.setState({
        isChecked: true
      })
    } else {
      this.setState({
        isChecked: false
      })
    }
  }

  render() {

    let todo = this.props.todo
    let todoName = ""
    let todoTime = 0
    let todoDescription = ""
    let todoUrl = ""
    //console.log(todo)

    if ("activity" in todo) {
      todoName = todo.activity.name
      todoTime = todo.activity.minDuration
      todoDescription = todo.activity.description
      todoUrl = todo.activity.url
    } else {
      todoName = todo.name
      todoTime = todo.minDuration
      todoDescription = todo.description
      todoUrl = todo.url
    }

    return (
      
      <div className="mb-4"><article>
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