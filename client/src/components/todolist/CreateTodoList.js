import React, { Component } from 'react';
import axios from 'axios';

class CreateToDoList extends Component {
  // CreateToDoList receives the available time, possibleCategories and user as props
  // Calls for useractivities & allactivites from backend and sets as state

  state = {
    userActivitiesFromDb: this.props.user.bookmarkedActivities,
    allActivitiesFromDb: []
  }

  // Call to backend to get useractivities

  componentDidMount = () => {
    axios.get('/api/activities')
        .then(response => {
          console.log("Repsonse from backend: ", response.data)
            this.setState({ 
              allActivitiesFromDb: response.data,
            })
        })
    
  }

  // Functions that generate todo list as Class Methods for CreateToDoList
/*
  generateToDoList = (time, categories) => {
    let toDoList = [];
    let timeLeft = time;
    
    // Step 1a: Check for activities that meet certain criteria (high priority)
    let highPriorityToDos = this.checkForHighPriorityToDos(this.state.userActivitiesFromDb)
  
    // Step 1b: Assess how many can be added to the todolist
    let highPriorityForToDoList = this.selectActivitiesForToDoList(highPriorityToDos, timeLeft)
    highPriorityForToDoList.forEach(todo => toDoList.push(todo))
    
    // Update timeLeft
    //console.log("Duration", sumActivityDuration(toDoList))
    timeLeft = time - this.sumActivityDuration(toDoList)
  
    // Step 2a: Check for activities that meet certain criteria (on user list matching to possible categories)
    let savedActivities = this.checkForSavedActivities(this.state.userActivitiesFromDb, categories) // returns highprio todos
    console.log("Saved", savedActivities)
  
    // Step 2b: Assess how many can be added to the todolist
    let savedActivitiesForToDoList = this.selectActivitiesForToDoList(savedActivities, timeLeft)
    savedActivitiesForToDoList.forEach(todo => toDoList.push(todo))
  
    // Update timeLeft
    console.log("Duration", this.sumActivityDuration(toDoList))
    timeLeft = time - this.sumActivityDuration(toDoList)
  
    // Step 3a: Check for activities that meet criteria in all activities
    let suggestedActivities = this.checkForAllActivities(this.state.allActivitiesFromDb, categories, timeLeft)
    console.log("suggested", suggestedActivities)
  
    //Step 3b: Assess how many can be added to the todolist
    let suggestedActivitiesForToDoList = this.selectActivitiesForToDoList(suggestedActivities, timeLeft)
    suggestedActivitiesForToDoList.forEach(todo => toDoList.push(todo))
  
    // Update timeLeft
    console.log("Duration", this.sumActivityDuration(toDoList))
    timeLeft = time - this.sumActivityDuration(toDoList)
    
    console.log(timeLeft)
  
    return toDoList
  
  }
  
  checkForHighPriorityToDos = (userActivities) => {
    return userActivities.filter(activity => activity.highPriority === true)
  }
  
  checkForSavedActivities = (userActivities, categories) => {
    console.log("Checking for saved activities");
  
    let savedActivities = userActivities.filter(activity => {
      //console.log(activity)
      return categories.some(category => {
        //console.log(category)
        return activity.categories.includes(category)
      })
    }).filter(activity => activity.highPriority !== true)
    return savedActivities
  }
  
  checkForAllActivities = (allActivities, categories) => {
    console.log("Checking for all activities");
  
    let suggestedActivities = allActivities
    .filter(activity => {
      //console.log(activity)
      return categories.some(category => {
        //console.log(category)
        return activity.categories.includes(category)
      })
    })
    
    suggestedActivities.map(activity => {
      return activity.plannedDuration = Number(activity.minDuration)
    })
  
    return suggestedActivities
  }
  
  sumActivityDuration = (activities) => {
    if (activities.length > 0) {
      let objWithSum = activities.reduce((todo1, todo2) => ({plannedDuration: todo1.plannedDuration + todo2.plannedDuration}))
      return objWithSum.plannedDuration
    }
    return 0
  }
  
  selectActivitiesForToDoList = (activities, timeLeft) => {
    console.log(activities)
    console.log(timeLeft)
    let activityDuration = this.sumActivityDuration(activities)
    console.log("Duration in Function", activityDuration)
  
    if (activityDuration <= timeLeft) {
      return activities
    } else {
      activities.sort((todo1, todo2) => todo1.plannedDuration - todo2.plannedDuration)
      while (this.sumActivityDuration(activities) > timeLeft) {
        activities.pop() // Remove the most time-consuming activity
      }
      return activities
    }
  }
*/

  render() {

    //let generatedToDoList = this.generateToDoList(this.props.availableTime, this.props.possibleCategories)
    //console.log(generatedToDoList)

    return (
      <div>
        <div>
        Here is your To Do List!
        Available time: {this.props.availableTime} min
        Possible Categories:
          <ul>
            {this.props.possibleCategories.map(category => <li>{category}</li>)}
          </ul>
        </div>
        <div id="todolist">
        Render todolist here
        {/* {generatedToDoList} */}
        <ul>
        {this.state.allActivitiesFromDb.map(activity => <li>{activity.name}</li>)}
          </ul>
        </div>
      </div>
    )
  }
}

export default CreateToDoList;