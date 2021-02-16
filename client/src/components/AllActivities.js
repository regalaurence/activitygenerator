import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity.js'
import { Link, withRouter } from 'react-router-dom';
import FilterByCategory from './FilterByCategory'
import "bulma";

class AllActivities extends Component {

  state = {
    activitiesFromDb: [],
    search: '',
    filterBy: '',
    isLoading: true,
    isError: false
  }

  componentDidMount() {
    axios.get("/api/activities")
      .then(response => {
        this.setState({ 
          activitiesFromDb: response.data, 
          isLoading: false 
        })
      })
    .catch((err => {
      this.setState({
        isError: true
      })
    }))
  }

  handleChange = (event) => {
    let target = event.target;
    let value = target.value;
    this.setState({
      search: value
    });
    console.log('state here', this.state);
  };

  handleFilterChange = (event) => {
    this.setState({
      filterBy: event.target.value
    })
  }

  render() {
    let filteredByActivities = [...this.state.activitiesFromDb]
    if (this.state.filterBy.length !== 0) {
      filteredByActivities = [...this.state.activitiesFromDb]
            .filter(activity => activity.categories.includes(this.state.filterBy))
    }

    let filteredBySearchAndCatsActivities = [...filteredByActivities]
      .filter(activity => {
        return activity.name.toLowerCase().includes(this.state.search.toLowerCase());
      });
    
    console.log(filteredBySearchAndCatsActivities)

    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered has-text-centered center">
              <form style={{ maxWidth: "512px" }} className="center">
                <div className="field">
                  <div className="columns is-vcentered is-centered center">
                    <figure className="image center" style={{ maxWidth: "412px" }}>
                      <img src="images/AllActivities.png" />
                    </figure>
                  </div>
                  <div className="control">
                    <Link to="/my-activities"> <button className="button is-primary mb-3">My Activities</button></Link>
                    <Link to="/add-activity"> <button className="button is-primary mb-3">Create Activity</button></Link>
                  </div>
                  <div className="control">
                    <p className="control">
                      <input className="input mb-1" type="text" placeholder="Find Activity..." name="search" value={this.state.search} onChange={this.handleChange} />
                      
                    </p>
                   
                  </div>
                  <FilterByCategory
                    handleFilterChange={this.handleFilterChange}
                  />
                  
                </div>
              </form>
            </div>
            <div>
            {this.state.isLoading && <progress className="progress is-small is-primary" max="100">15%</progress>}
              {filteredBySearchAndCatsActivities
                .map(activity => <Activity
                  key={activity._id}
                  activity={activity}
                  currentFavorites={this.props.currentFavorites}
                  addToFavorite={this.props.addToFavorite}
                  removeFromFavorite={this.props.removeFromFavorite}
                />)}
            </div>
          </div>
        </div>
      </section>
    )
  }
}



export default withRouter(AllActivities);