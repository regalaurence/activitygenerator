import React, { Component } from 'react';
//import axios from 'axios';
//import SelectMonth from './SelectMonth'
import CategoriesCheckboxes from './../createactivities/CategoriesCheckboxes';
//import { Route } from 'react-router-dom';

class ToDoListInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      availableTime: 0,
      possibleCategories: []
    };
  }

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onFormSubmit(this.state.availableTime, this.state.possibleCategories)
  }

  handleChange = (event) => {
    let { name, value, id } = event.target;
    event.preventDefault()
    if (id === "categories") {
      if (!this.state.possibleCategories.includes(name)) {
        this.setState({
          possibleCategories: [...this.state.possibleCategories, name]
        })
      }
      else {
        let filteredDeletion = this.state.possibleCategories.filter(c => c !== name)
        this.setState({
          possibleCategories: filteredDeletion
        })
      }
    }
    // else if (name === 'cost') {
    //   this.setState({
    //     cost: !this.state.cost
    //   })
    // }
    else {
      this.setState({
        [name]: value
      })
    }
  }


  render() {

    return (
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered">

              <form style={{ maxWidth: "612px" }} onSubmit={this.submitHandler}>
                <h2 className="title is-3 mb-5">Let me do something!</h2>


                <div className="field control">
                  <label className="label">{`How much time do you have? (in min) `}
                 
                    <input  style={{ maxWidth: "100px" }} className="input is-small" type="number" name="availableTime" value={this.state.availableTime} onChange={this.handleChange} />
                    </label>
                  </div>
              
                <CategoriesCheckboxes
                  label="Categories"
                  value={this.state.possibleCategories}
                  onChange={this.handleChange}
                />
                
                <label className="label"><input type="checkbox" name="cost" value={!this.state.cost} onChange={this.handleChange} />{` Include only free activities (not done)`}</label>

                <div className="control">
                  <button onClick={this.submitHandler} className="button is-primary mt-5">Ok, make me do!!</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ToDoListInput;
