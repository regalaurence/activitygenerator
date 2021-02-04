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

    //let generatedToDoList = this.generateToDoList(this.props.availableTime, this.props.possibleCategories)
    //console.log("Todolist in Render: ", generatedToDoList)

    let todo = this.props.todo
    let todoName = ""
    let todoTime = 0
    console.log(todo)

    if (todo.isHighPriority !== undefined) {
      todoName = todo.activity.name
      todoTime = todo.activity.minDuration
    } else {
      todoName = todo.name
      todoTime = todo.minDuration
    }

    return (
      
      <div>
        <input type="checkbox" checked={this.state.isChecked} id="todo-item" name={todoName} onChange={this.checkBoxHandler} />
        {todoName}
        {todoTime} mins
      </div>
    )
  }
}

export default ToDoListItem;