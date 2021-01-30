import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity.js'

class AllActivities extends Component {

  state = {
    activitiesFromDb: [],
    search: ''
  }

  componentDidMount() {
    axios.get("/api/activities")
      .then(response => {
        this.setState({ activitiesFromDb: response.data })
        console.log("Response from backend: ", response.data)
      })
  }

  handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    this.setState({
      search: value
    });
    console.log('state here', this.state);
  };




  render() {
    console.log(this.props.user)

    let filteredActivities = [...this.state.activitiesFromDb].filter(activity => {
      return activity.name.toLowerCase().includes(this.state.search.toLowerCase());
    });

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
        {filteredActivities
          .map(activity => <Activity
            key={activity._id}
            idToPush={activity._id}
            activity={activity}
            currentFavorites={this.props.currentFavorites} 
            addToFavorite={this.props.addToFavorite}
            removeFromFavorite={this.props.removeFromFavorite}
            />)}
      </div>
    )
  }
}



export default AllActivities;

{/* <h3>All Activities</h3>
        {this.state.activitiesFromDb.map(activity => <Activity activity={activity} />)}
      </div> */}