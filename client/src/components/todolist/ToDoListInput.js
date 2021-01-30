import React, { Component } from 'react';
//import axios from 'axios';
//import SelectMonth from './SelectMonth'
import CategoriesCheckboxes from './../createactivities/CategoriesCheckboxes';
//import { Route } from 'react-router-dom';

class ToDoListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTime: 0,
      possibleCategories: []
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.availableTime, this.state.possibleCategories)
  }

  handleChange = (event) => {
    let { name, value, id } = event.target;

    if (id === "categories") {
      if (!this.state.possibleCategories.includes(name)) {
        this.setState({
          possibleCategories: [...this.state.possibleCategories, name]
        })
      }
      else {
        let filteredDeletion = this.state.possibleCategories.filter(c => c !== name)
        this.setState({
          possibleCategories: filteredDeletion
        })
      }
    }
    // else if (name === 'cost') {
    //   this.setState({
    //     cost: !this.state.cost
    //   })
    // }
    else {
      this.setState({
        [name]: value
      })
    }
  }


  render() {

    return (
      <div>
        <h3>Make me DO!!</h3>
        <form onSubmit={this.submitHandler}>
    
          <label>How much time do you have? (in min)</label>
          <input type="number" name="availableTime" value={this.state.availableTime} onChange={this.handleChange} /><br></br>

          <CategoriesCheckboxes
            label="Categories"
            value={this.state.possibleCategories}
            onChange={this.handleChange}
          />
            <label>Include only free activities (not working)</label>
          <input type="checkbox" name="cost" value={!this.state.cost} onChange={this.handleChange} /><br></br>

          <button onClick={this.submitHandler}>Ok, MAKE ME DO!</button>
        </form>
      </div>
    )
  }
}

export default ToDoListInput;