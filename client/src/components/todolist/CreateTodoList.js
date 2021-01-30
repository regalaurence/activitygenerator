import React, { Component } from 'react';
//import axios from 'axios';

class CreateToDoList extends Component {


  componentDidMount = () => {
    
  }

  render() {
    return (
      <div>
        We will create a ToDo List for you!

        Available time: {this.props.availableTime} min
        Possible Categories:
        <ul>
          {this.props.possibleCategories.map(category => <li>{category}</li>)}
        </ul>
      </div>
    )
  }
}

export default CreateToDoList;