import React, { Component } from 'react';
import axios from 'axios';
import SelectMonth from './SelectMonth'
import CategoriesCheckboxes from './CategoriesCheckboxes';

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      url: [],
      minDuration: 20,
      // creator:{type: Schema.Types.ObjectId, ref: 'User'},
      categories: [],
      startTime: 7,
      endTime: 22,
      cost: false,
      seasonStart: new Date('2020-01'),
      seasonEnd: new Date('2020-12')
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let { name, minDuration, categories, startTime, endTime, cost, seasonStart, seasonEnd } = this.state;
    axios.post("/api/activities", { name, minDuration, categories, startTime, endTime, cost, seasonStart, seasonEnd })
      .then(() => {
        // this.props.getData();
        this.setState({
          name: "",
          minDuration: 0,
          // creator:{type: Schema.Types.ObjectId, ref: 'User'},
          categories: "",
          startTime: "",
          endTime: "",
          cost: false,
          seasonStart: new Date('2020-01'),
          seasonEnd: new Date('2020-12')
        });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    let { name, value, id } = event.target;
    // let x = {
    // name = event.target.name
    // name = event.target.value
    // name = event.target.type
    // }

    if (id === "categories") {
      if (!this.state.categories.includes(name)) {
        this.setState({
          categories: [...this.state.categories, name]
        })
      }
      else {
        let filteredDeletion = this.state.categories.filter(c => c !== name)
        this.setState({
          categories: filteredDeletion
        })
      }
    }
    else if (name === 'cost') {
      this.setState({
        cost: !this.state.cost
      })
    }
    else if (id === 'startmonth') {
      this.setState({
        seasonStart: new Date('2020-' + value)
      })
    }
    else if (id === 'startmonth') {
      this.setState({
        seasonEnd: new Date('2020-' + value)
      })
    }
    else {
      this.setState({
        [name]: value
      })
    }
  }


  render() {


    return (
      <div>
        <h3>Create a new activity</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={this.handleChange} /><br></br>

          <label>Duration in minutes:</label>
          <input type="number" name="minDuration" value={this.state.minDuration} onChange={this.handleChange} /><br></br>

          <CategoriesCheckboxes
            label="Categories"
            value={this.state.categories}
            onChange={this.handleChange}
          />
         
          <label>Possible from:</label>
          <input type="number" name="startTime" value={this.state.startTime} onChange={this.handleChange} />h<br></br>
          <label>Possible until:</label>
          <input type="number" name="endTime" value={this.state.endTime} onChange={this.handleChange} />h<br></br>
          <label>Is the activity for free?</label>
          <input type="checkbox" name="cost" value={!this.state.cost} onChange={this.handleChange} /><br></br>

          <label>I'd rather do this </label>
          <SelectMonth label={"between"} />
          <SelectMonth label={"and"} />
          <button onClick={this.handleFormSubmit}>Ok, let's add!</button>
        </form>
      </div>
    )
  }
}

export default AddActivity;