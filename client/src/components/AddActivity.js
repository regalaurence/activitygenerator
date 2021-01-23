import React, { Component } from 'react';
import axios from 'axios';

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
        seasonStart : new Date('2020-' + value)
      })
    }
    else if (id === 'startmonth') {
      this.setState({
        seasonEnd : new Date('2020-' + value)
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

          <label>Categories:</label><br />
          <label for="indoors">Indoors: </label>
          <input type="checkbox" id="categories" name="indoors" value={this.state.categories} onChange={this.handleChange} /><br></br>
          <label for="outdoors">Outdoors: </label>
          <input type="checkbox" id="categories" name="outdoors" value={this.state.categories} onChange={this.handleChange} /><br></br>
          <label for="sports">Sports: </label>
          <input type="checkbox" id="categories" name="sports" value={this.state.categories} onChange={this.handleChange} /><br></br>
          <label for="aventures">Adventures: </label>
          <input type="checkbox" id="categories" name="aventures" value={this.state.categories} onChange={this.handleChange} /><br></br>
          <label for="housework">Housework: </label>
          <input type="checkbox" id="categories" name="housework" value={this.state.categories} onChange={this.handleChange} /><br></br>
          <label for="socializing">Socializing: </label>
          <input type="checkbox" id="categories" name="socializing" value={this.state.categories} onChange={this.handleChange} /><br></br>
          <label for="relaxing">Relaxing: </label>
          <input type="checkbox" id="categories" name="relaxing" value={this.state.categories} onChange={this.handleChange} /><br></br>
          <label for="online">Online: </label>
          <input type="checkbox" id="categories" name="online" value={this.state.categories} onChange={this.handleChange} /><br></br>

          <label>Possible from:</label>
          <input type="number" name="startTime" value={this.state.startTime} onChange={this.handleChange} />h<br></br>
          <label>Possible until:</label>
          <input type="number" name="endTime" value={this.state.endTime} onChange={this.handleChange} />h<br></br>
          <label>Is the activity for free?</label>
          <input type="checkbox" name="cost" value={!this.state.cost} onChange={this.handleChange} /><br></br>

          <label>Time of year:</label>
          <label for="seasons">Between</label>
          <select id="startmonth" name="cars">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <label for="seasons">And...</label>
          <select id="startmonth" name="cars">
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
          <button onClick={this.handleFormSubmit}>Ok, let's add!</button>
        </form>
      </div>
    )
  }
}

export default AddActivity;