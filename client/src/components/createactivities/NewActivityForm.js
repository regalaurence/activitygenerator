import React, { Component } from 'react';
import axios from 'axios';
import SelectMonth from './SelectMonth'
import CategoriesCheckboxes from './CategoriesCheckboxes';
import { withRouter } from 'react-router-dom';

class AddActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      url: [],
      minDuration: 20,
      creator: this.props.user._id,
      categories: [],
      startTime: 7,
      endTime: 22,
      cost: false,
      isHighPriority: false,
      seasonStart: new Date('2020-01'),
      seasonEnd: new Date('2020-12'),
      button: ""
    };
  }

  handleFormSubmit = (event) => {
    event.preventDefault();
    let { name, description, url, minDuration, creator, categories, startTime, endTime, cost, isHighPriority, seasonStart, seasonEnd, button } = this.state;
    if (button == "addOne") {
      axios.post("/api/activities", { name, description, url, minDuration, creator, categories, startTime, endTime, cost, isHighPriority, seasonStart, seasonEnd })
        // .then(() => axios.get("/api/activities"))
        // .then((response) => console.log(response))
        .then(() => {
          this.setState({
            name: "",
            description: "",
            url: [],
            minDuration: 0,
            creator: "",
            categories: "",
            startTime: "",
            endTime: "",
            cost: false,
            isHighPriority: false,
            seasonStart: new Date('2020-01'),
            seasonEnd: new Date('2020-12'),
            button: ""
          });
          this.props.history.push('/activities');
        })
        .catch(error => console.log(error))
    } else {

      axios.post("/api/activities", { name, description, url, minDuration, creator, categories, startTime, endTime, cost, isHighPriority, seasonStart, seasonEnd })
        // .then(() => axios.get("/api/activities"))
        // .then((response) => console.log(response))
        .then(() => {
          this.setState({
            name: "",
            description: "",
            url: [],
            minDuration: 0,
            creator: "",
            categories: "",
            startTime: "",
            endTime: "",
            cost: false,
            isHighPriority: false,
            seasonStart: new Date('2020-01'),
            seasonEnd: new Date('2020-12'),
            button: ""
          });
          this.props.history.push('/add-activity');
        })
        .catch(error => console.log(error))
    }
  }

  handleChange = (event) => {
    let { name, value, id } = event.target;
    // let x = {
    // name = event.target.name
    // name = event.target.value
    // name = event.target.type
    // }

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
      console.log(event.target.value)
      this.setState({
        seasonStart: new Date('2020-' + value)
      })
    }
    else if (id === 'seasonEnd') {
      console.log(id)
      this.setState({
        seasonEnd: new Date('2020-' + value)
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



              <form style={{ maxWidth: "612px" }} onSubmit={this.handleFormSubmit} id="addActivityForm">
                <h2 className="title is-3">Create a new activity</h2>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="e.g Listening podcast" name="name" value={this.state.name} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="e.g Listening 'Armchair Expert' ep. 63" name="description" value={this.state.description} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Url</label>
                  <div className="control">
                    <input className="input" type="text" placeholder="e.g https://armchairexpertpod.com" name="url" value={this.state.url} onChange={this.handleChange} />
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
                    <input className="input" type="number" name="startTime" value={this.state.startTime} onChange={this.handleChange} />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Possible roughly until:</label>
                  <div className="control" style={{ maxWidth: "100px" }}>
                    <input className="input" type="number" name="endTime" value={this.state.endTime} onChange={this.handleChange} />
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
                  <label className="label">I'd rather do this

                  <SelectMonth label={"between"} agenda={"seasonStart"} onSelect={this.handleChange} />
                    <SelectMonth label={"and"} agenda={"seasonEnd"} onSelect={this.handleChange} />
                  </label>
                  <div className="control">
                    <div classNAme="select">
                      <div className="control">
                        <button name="button" value="addOne" onClick={this.handleFormSubmit} className="button is-primary mb-3">Add this one only</button>

                        <button name="button" value="addMore" onClick={this.handleFormSubmit} className="button is-primary mb-3">Add another after that</button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default withRouter(AddActivity);

















