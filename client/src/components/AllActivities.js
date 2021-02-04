import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity.js'
import { Link, withRouter } from 'react-router-dom';

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
      <section className="hero">
      <div className="hero-body">
        <div className="container">
      <div className="columns is-vcentered is-centered has-text-centered">
      <form style={{ maxWidth: "512px" }}>
      
        <div className="field">
        <div className="columns is-vcentered is-centered">

              <figure className="image">
                <img style={{ maxWidth: "412px" }} src="images/AllActivities.png" />
              </figure>
            </div>

            <div className="control">
            <Link to="/my-activities"> <button className="button is-primary mb-3">My Activities</button></Link> 
            <Link to="/add-activity"> <button className="button is-primary mb-3">Create Activity</button></Link>
                </div>

  
                  


                  <div className="control">
                    <p className="control has-icons-left">
                      <input className="input" type="text" placeholder="Find Activity..." name="search" value={this.state.search} onChange={this.handleChange} />
                      <span className="icon is-small is-left">
                        <i className="fas fa-search"></i>
                      </span>
                    </p>
                  </div>
                  </div>
        </form>
        </div>      
        <div>
        
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
      </div>
      </div>
      </section>
    )
  }
}



export default withRouter(AllActivities);