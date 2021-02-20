import React from 'react'
import {Link} from 'react-router-dom';

class SavedActivity extends React.Component {

  state = {
    activityDetailsShown: false,
    clickedActivity: null,
  }

  printDetails = (argActivity) => {
    let forDetail = [...this.props.currentFavorites]
    let foundActivity = forDetail.find(el => el._id === argActivity)
    return (<div className="column is-vcentered is-centered"><p>
      {foundActivity.description
        ? <span><strong>Description:</strong><br></br>{foundActivity.description}</span>
        : <span><strong>Description:</strong><br></br>Edit this activity to add the description</span>}<br></br>
        {foundActivity.url.length > 0
        ? <span><strong>Useful link: </strong><a href={foundActivity.url}>{foundActivity.url}</a></span>
        : <span><strong>Useful link: </strong><br></br>Edit this activity to add one</span>}<br></br>
      <strong>Duration:</strong> {foundActivity.minDuration}<br></br>
      {foundActivity.hasCost
        ? <span><strong>Cost:</strong> It's not for free</span>
        : <span><strong>Cost:</strong> It's for free!</span>}<br></br>
      {foundActivity.isHighPriority
        ? <span><strong>Priority:</strong> High</span>
        : <span><strong>Priority:</strong> Low</span>} </p></div>)
  }

  removeFromFavorites = (event) => {
    this.props.removeFromFavorite(event.target.value)
  }

  showActivityDetails = (event) => {
    this.setState({
      activityDetailsShown: !this.state.activityDetailsShown,
      clickedActivity: event.target.value,
    })
  }

  render() {
    return (
      <div className="column is-full has-text-centered">
        <h1 className="activity-name"><strong>{this.props.name}</strong></h1>
        <button onClick={this.showActivityDetails} key={this.props.id} value={this.props.id} className="button is-small is-success mr-2">{this.state.activityDetailsShown ? "Hide details" : "Show details"}</button>
        <Link to="/edit-activity"><button className="button is-small is-success is-outlined mr-2" value={this.props.id} onClick={(event) => { this.props.editActivity(event.target.value) }}>Edit activity</button></Link>
        <button className="button is-light is-small" value={this.props.id} onClick={this.removeFromFavorites}>Remove</button>
        {/* {activity.isHighPriority ? <span> High priority</span> : <span> Low priority</span>}  */}
        {this.props.id === this.state.clickedActivity ? <div className="columns is-multiline is-mobile">
          {this.state.activityDetailsShown && this.printDetails(this.state.clickedActivity)}
        </div> : <p></p>}
      </div>
    )
  }
}

export default SavedActivity