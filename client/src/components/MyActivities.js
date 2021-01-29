import React, { Component } from 'react';
import axios from 'axios';
import Activity from './Activity.js'

class MyActivities extends Component {

  render() {
    return (
      <div>
       {this.props.currentFavorites && 
       this.props.currentFavorites.map(activity => <li>{activity}</li>)}
      </div>
    )
  }
}

export default MyActivities;