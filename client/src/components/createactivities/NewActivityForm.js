import React, { Component } from 'react';
import axios from 'axios';
import SelectMonth from './SelectMonth'
import CategoriesCheckboxes from './CategoriesCheckboxes';
import { withRouter } from 'react-router-dom';

const initialState = {
  name: "",
  description: "",
  url: [],
  minDuration: 20,
  categories: [],
  timeWindowStart: 7,
  timeWindowEnd: 22,
  cost: false,
  isHighPriority: false,
  seasonStart: 1,
  seasonEnd: 12
}

class AddActivity extends Component {

  state = { ...initialState, creator: this.props.user._id }

  submitData = () => {
    let { name, description, url, minDuration, creator, categories, timeWindowStart, timeWindowEnd, cost, isHighPriority, seasonStart, seasonEnd } = this.state;

    return axios.post("/api/activities", { name, description, url, minDuration, creator, categories, timeWindowStart, timeWindowEnd, cost, isHighPriority, seasonStart, seasonEnd })
      .then((response) => {
        this.props.addToFavorite(response.data, this.state.isHighPriority)
        axios.put(`/api/user/${this.props.user._id}`,
          {
            $push: { "bookmarkedActivities": response.data }
          })
      })
      .then(() => {
        this.setState(initialState);
      })
      .catch(error => console.log(error))
  }

  handleAddOne = () => {
    if (this.state.name.length === 0 || this.state.categories.length === 0) {
      return alert('You need to select a category')
    }
    else {
      this.submitData().then(() => {
        this.props.history.push('/activities');
      })
    }
  }

  handleAddMore = () => {
    if (this.state.name.length === 0 || this.state.categories.length === 0) {
      return alert('You need to select a category')
    }
    else {
      this.submitData()
    }
  }

  handleChange = (event) => {
    let { name, value, id } = event.target;

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
    else if (name === 'isHighPriority') {
      this.setState({
        isHighPriority: !this.state.isHighPriority
      })
    }
    else if (id === 'seasonStart') {
      this.setState({
        seasonStart: value
      })
    }
    else if (id === 'seasonEnd') {
      console.log(id)
      this.setState({
        seasonEnd: value
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
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered">
              <div style={{ maxWidth: "612px" }} id="addActivityForm">
                <h2 className="title is-3">Create a new activity</h2>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input className="input"
                      type="text"
                      placeholder="e.g Listen to some podcast"
                      name="name"
                      value={this.state.name}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input className="input"
                      type="text"
                      placeholder="e.g 'Armchair Expert' ep. 63"
                      name="description"
                      value={this.state.description}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Any useful link?</label>
                  <div className="control">
                    <input className="input"
                      type="text"
                      placeholder="e.g https://armchairexpertpod.com"
                      name="url" value={this.state.url}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Duration in minutes:</label>
                  <div className="control">
                    <input className="input"
                      type="number"
                      name="minDuration"
                      value={this.state.minDuration}
                      onChange={this.handleChange}
                      required
                    />
                  </div>
                </div>

                <CategoriesCheckboxes
                  label="Categories"
                  value={this.state.categories}
                  onChange={this.handleChange}
                />

                <div className="field">
                  <label className="label">Possible roughly from:</label>
                  <div className="control" style={{ maxWidth: "100px" }}>
                    <input className="input"
                      min="0"
                      max="24"
                      type="number"
                      name="timeWindowStart"
                      value={this.state.timeWindowStart}
                      onChange={this.handleChange} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Possible roughly until:</label>
                  <div className="control" style={{ maxWidth: "100px" }}>
                    <input className="input"
                      min="0"
                      max="24"
                      type="number"
                      name="timeWindowEnd"
                      value={this.state.timeWindowEnd}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox" name="cost" checked={this.state.cost} onChange={this.handleChange} />
                      {` Is the activity for free?`}</label>
                  </div>
                </div>

                <div className="field">
                  <div className="control">
                    <label className="checkbox">
                      <input type="checkbox" name="isHighPriority" checked={this.state.isHighPriority} onChange={this.handleChange} />
                      {` Is it a high priority?`}</label>
                  </div>
                </div>


                <div className="field">
                  <label className="label">I'd rather do this

                  <SelectMonth label={"between"} agenda={"seasonStart"} onSelect={this.handleChange} />
                    <SelectMonth label={"and"} agenda={"seasonEnd"} onSelect={this.handleChange} />
                  </label>
                  <div className="control">
                    <div classNAme="select">
                      <div className="control">
                        <button onClick={this.handleAddOne} className="button is-primary mb-3">Add this one only</button>
                        <button onClick={this.handleAddMore} className="button is-primary mb-3">Add another after that</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(AddActivity);

















