import React, { Component } from 'react';
//import axios from 'axios';

class Activity extends Component {

  render() {
    return (
      <div>
        <h4>{this.props.activity.name}</h4>
        <button>Save to My Activities (not working)</button>
        {/* Change button to "Remove from my activities if the user has saved it" */}
      </div>
    )
  }
}

export default Activity;