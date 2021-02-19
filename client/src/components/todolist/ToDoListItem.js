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
    console.log("Calling on check", event.target.todoid)
    this.props.onCheck(event.target.id, event.target.checked)
  }

  render() {

    let todo = this.props.todo
    console.log("Todo", todo)
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

    console.log(todoId)

    return (
      
      <div className="mb-4"><article>
        <input type="checkbox" checked={this.state.isChecked} id={todoId} name={todoName} onChange={this.checkBoxHandler} />
        <strong> {todoName}</strong>
         <br></br><strong>Description:</strong> {todoDescription ? todoDescription : <>You haven't provided one. Go to My Activities to edit.</> }
        <br></br><strong> Duration: </strong>{todoTime} mins
        </article>
      </div>
    )
  }
}

export default ToDoListItem;