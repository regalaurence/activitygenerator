import React, { Component } from 'react';
import axios from 'axios';
//import SelectMonth from './SelectMonth'
import CategoriesCheckboxes from './../createactivities/CategoriesCheckboxes';

class ToDoListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTime: 0,
      possibleCategories: []
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    // let { availableTime, possibleCategories } = this.state;
    // axios.post("/api/activities", { name, minDuration, categories, startTime, endTime, cost, seasonStart, seasonEnd })
    //   .then(() => {
    //     // this.props.getData();
    //     this.setState({
    //       name: "",
    //       minDuration: 0,
    //       // creator:{type: Schema.Types.ObjectId, ref: 'User'},
    //       categories: "",
    //       startTime: "",
    //       endTime: "",
    //       cost: false,
    //       seasonStart: new Date('2020-01'),
    //       seasonEnd: new Date('2020-12')
    //     });
      //})
     // .catch(error => console.log(error))
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
        <form onSubmit={this.handleFormSubmit}>
    
          <label>How much time do you have? (in min)</label>
          <input type="number" name="availableTime" value={this.state.availableTime} onChange={this.handleChange} /><br></br>

          <CategoriesCheckboxes
            label="Categories"
            value={this.state.possibleCategories}
            onChange={this.handleChange}
          />
            <label>Include only free activities (not working)</label>
          <input type="checkbox" name="cost" value={!this.state.cost} onChange={this.handleChange} /><br></br>

          <button onClick={this.handleFormSubmit}>Ok, MAKE ME DO!</button>
        </form>
      </div>
    )
  }
}

export default ToDoListInput;