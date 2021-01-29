import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity.js'

class AllActivities extends Component {

  state = {
    activitiesFromDb: []
  }

  componentDidMount() {
    axios.get("/api/activities")
      .then(response => {
        console.log("Response from backend: ", response.data)
        this.setState({ activitiesFromDb: response.data })
      })
  }

  handleChange=(event) =>{
    let target = event.target;
    let value = target.value;
    this.setState({ 
        search: value 
    });
// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('state here', this.state);
};




  render() {

    let allActivities = [...this.state.activitiesFromDb].filter(activity => {
      return activity.name.toLowerCase().includes(this.state.search);
    });



    console.log(this.state.activitiesFromDb)
    return (

<div className="all-activities">
          <form>
            <input
              type="text"
              placeholder="Find activity here..."
              name="search"
              value={this.state.search}
              onChange={this.handleChange}
            />
          </form>


      
        <h3>All Activities</h3>
        {this.state.activitiesFromDb.map(activity => <Activity activity={activity} />)}
      </div>
    )
  }
}

export default AllActivities;