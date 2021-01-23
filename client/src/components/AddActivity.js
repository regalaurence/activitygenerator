import React, { Component } from 'react';
import axios from 'axios';

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      minDuration: "",
      // creator:{type: Schema.Types.ObjectId, ref: 'User'},
      categories: [],
      startTime: "",
      endTime: "",
      cost: false,
      weather: ""
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let { name, minDuration, categories, startTime, endTime, cost, weather } = this.state;

    axios.post("/api/activities", { name, minDuration, categories, startTime, endTime, cost, weather })
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
          weather: ""
        });
      })
      .catch(error => console.log(error))
  }

  handleChange = (event) => {
    const { name, value, type} = event.target;

    if (type === 'checkbox') {
      value = event.target.checked;
    }

    this.setState({ [name]: value });
  }


  render() {
    return (
      <div>
      <h3>Create a new activity</h3>
        <form onSubmit={this.handleFormSubmit}>
          <label>Name:</label>
          <input type="text" name="name" value={this.state.name} onChange={e => this.handleChange(e)} /><br></br>
          <label>Duration in minutes:</label>
          <input type="number" name="minDuration" value={this.state.minDuration} onChange={e => this.handleChange(e)} /><br></br>
          {/* <label>Categories:</label>
          <input type="checkbox" name="categories" checked={this.state.categories} onChange={e => this.handleChange(e)} /><br></br> */}
          <label>Possible from:</label>
          <input type="time" name="startTime" value={this.state.startTime} onChange={e => this.handleChange(e)} /><br></br>
          <label>Possible untill:</label>
          <input type="time" name="endTime" value={this.state.endTime} onChange={e => this.handleChange(e)} /><br></br>
          {/* <label>Is the activity for free?</label>
          <input type="checkbox" name="cost" checked={this.state.cost} onChange={e => this.handleChange(e)} /><br></br> */}

          {/* <label>Term of year:</label>
          <input type="checkbox" id="spring" name="weather" checked={this.state.weather} />
          <label for="spring">Spring</label><br></br>
          <input type="checkbox" id="summer" name="weather" checked={this.state.weather} />
          <label for="summer">Summer</label><br></br>
          <input type="checkbox" id="autumn" name="weather" checked={this.state.weather} />
          <label for="autumn">Autumn</label><br></br>
          <input type="checkbox" id="Winter" name="weather" checked={this.state.weather} />
          <label for="winter">Winter</label> */}



          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

export default AddActivity;