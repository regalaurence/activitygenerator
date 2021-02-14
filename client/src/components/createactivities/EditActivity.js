import React, { Component } from 'react';
import axios from 'axios';
import SelectMonth from './SelectMonth'
import CategoriesCheckboxes from './CategoriesCheckboxes';
import { withRouter } from 'react-router-dom';



class EditActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activityToChangeID: this.props.activityToChangeID,
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
  }

  componentDidMount = () => {
    let theActivity = this.props.currentFavorites.find(a => a._id === this.props.activityToChangeID)
    console.log("theActivitz", theActivity)
    this.setState({
      name: theActivity.name,
      description: theActivity.description,
      url: theActivity.url,
      minDuration: theActivity.minDuration,
      categories: theActivity.categories,
      timeWindowStart: theActivity.timeWindowStart,
      timeWindowEnd: theActivity.timeWindowEnd,
      cost: theActivity.cost,
      isHighPriority: theActivity.isHighPriority,
      seasonStart: theActivity.seasonStart,
      seasonEnd: theActivity.seasonEnd
    })
  }

  // submitData = () => {

  //   let { name, description, url, minDuration, creator, categories, timeWindowStart, timeWindowEnd, cost, isHighPriority, seasonStart, seasonEnd } = this.state;

  //   return axios.put(`/api/activities/${this.state.activityToChangeID}`, { name, description, url, minDuration, creator, categories, timeWindowStart, timeWindowEnd, cost, isHighPriority, seasonStart, seasonEnd })
  //     // .then(() => axios.get("/api/activities"))
  //     // .then((response) => console.log(response))
  //     .then((response) => {
  //       console.log("response from put route", response);
  //     })
  //     .catch(error => console.log(error))

  // }

  submitData = () => {
    let bookmarksCopy = [...this.props.currentFavorites]

    let { name, description, url, minDuration, creator, categories, timeWindowStart, timeWindowEnd, cost, isHighPriority, seasonStart, seasonEnd } = this.state;

    let currentActivity = bookmarksCopy.find(a => a._id === this.props.activityToChangeID) // deleting one
    currentActivity.name = name
    currentActivity.description = description
    currentActivity.url = url
    currentActivity.minDuration = minDuration
    currentActivity.categories = categories
    currentActivity.timeWindowStart = timeWindowStart
    currentActivity.timeWindowEnd = timeWindowEnd
    currentActivity.cost = cost
    currentActivity.isHighPriority = isHighPriority
    currentActivity.seasonStart = seasonStart
    currentActivity.seasonEnd = seasonEnd
    
    


    // adding the modified one
    //bookmarksCopy.push({ name, description, url, minDuration, creator, categories, timeWindowStart, timeWindowEnd, cost, isHighPriority, seasonStart, seasonEnd })

    let user = this.props.user
        user.bookmarkedActivities = bookmarksCopy
        this.props.updateUser(user)

    // return axios.put(`/api/user/${this.props.user._id}`,
    //   { bookmarkedActivities: bookmarksCopy })
    //   .then((response) => {
    //     console.log(response)
    //   })
  }




  handleEditOne = () => {
    this.submitData()
    
      this.props.history.push('/my-activities');

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
                    <input className="input" type="text" name="name" value={this.state.name} />
                  </div>

                  <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                      <input className="input" type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Url</label>
                    <div className="control">
                      <input className="input" type="text" name="url" value={this.state.url} onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Duration in minutes:</label>
                    <div className="control">
                      <input className="input" type="number" name="minDuration" value={this.state.minDuration} onChange={this.handleChange} />
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
                      <input className="input" type="number" name="seasonStart" value={this.state.timeWindowStart} onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <label className="label">Possible roughly until:</label>
                    <div className="control" style={{ maxWidth: "100px" }}>
                      <input className="input" type="number" name="seasonEnd" value={this.state.timeWindowEnd} onChange={this.handleChange} />
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" name="cost" value={!this.state.cost} onChange={this.handleChange} />
                        {` Is the activity for free?`}</label>
                    </div>
                  </div>

                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input type="checkbox" name="isHighPriority" value={!this.state.isHighPriority} onChange={this.handleChange} />
                        {` Is it a high priority?`}</label>
                    </div>
                  </div>


                  <div className="field">
                    <div className="label">I'd rather do this

                  <SelectMonth label={"between"} agenda={"seasonStart"} value={this.state.seasonStart} onSelect={this.handleChange} />
                      <SelectMonth label={"and"} agenda={"seasonEnd"} value={this.state.seasonEnd} onSelect={this.handleChange} />
                    </div>
                    <div className="control">

                      <div className="control">
                        <button onClick={this.handleEditOne} className="button is-primary mt-3 mr-3">Submit changes</button>


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

export default withRouter(EditActivity);

















