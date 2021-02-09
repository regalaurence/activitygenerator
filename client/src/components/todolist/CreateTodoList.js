import React, { Component } from 'react';
import axios from 'axios';
import ToDoListInput from './ToDoListInput';
import ToDoListItem from './ToDoListItem';

class CreateToDoList extends Component {
  // CreateToDoList receives the available time, possibleCategories and user as props
  // Calls for useractivities & allactivites from backend and sets as state

  state = {
    userActivitiesFromDb: [],
    allActivitiesFromDb: []
  }

  populateAcitivities = () => {
    //console.log("populate activities runs")
    let promises = []
    let activitiesToPopulate = this.props.user.bookmarkedActivities

    //console.log("activities to populate: ", activitiesToPopulate)

    for (let i = 0; i < activitiesToPopulate.length; i++) {
      promises.push(axios.get(`/api/activities/${activitiesToPopulate[i].activityID}`)
        .then(response => {
          return { activity: response.data, isHighPriority: activitiesToPopulate[i].isHighPriority }
        })
      )
    }

    //console.log("Promises: ", promises)

    Promise.all(promises)
      .then((response) => {
        //console.log("All promises resolved")
        //console.log("CHECK THIS OUTTTTTTT: " + response)
        this.setState({
          userActivitiesFromDb: response
        })
      })
  }


  // Call to backend to get allactivities

  componentDidMount = () => {
    //console.log("calling populate activities")
    this.populateAcitivities()
    axios.get('/api/activities')
      .then(response => {
        //console.log("Repsonse from backend: ", response.data)
        this.setState({
          allActivitiesFromDb: response.data,
        })
      })
  }

  // Functions that generate todo list as Class Methods for CreateToDoList

  generateToDoList = (time, categories) => {

    if (this.state.userActivitiesFromDb === 0 || this.state.allActivitiesFromDb.length === 0) {
      return [];
    }

    let toDoList = [];
    let timeLeft = time;

    // Step 1a: Check for activities that meet certain criteria (high priority)
    let highPriorityToDos = this.checkForHighPriorityToDos(this.state.userActivitiesFromDb)

    // Step 1b: Assess how many can be added to the todolist
    let highPriorityForToDoList = this.selectActivitiesForToDoList(highPriorityToDos, timeLeft)
    //console.log("High Prio for Todo List: ", highPriorityForToDoList)
    highPriorityForToDoList.forEach(todo => toDoList.push(todo))

    // Update timeLeft
    //console.log("Duration", sumActivityDuration(toDoList))
    timeLeft = time - this.sumActivityDuration(toDoList)

    // Step 2a: Check for activities that meet certain criteria (on user list matching to possible categories)
    let savedActivities = this.checkForSavedActivities(this.state.userActivitiesFromDb, categories) // returns highprio todos
    //console.log("Saved", savedActivities)

    // Step 2b: Assess how many can be added to the todolist
    let savedActivitiesForToDoList = this.selectActivitiesForToDoList(savedActivities, timeLeft)
    savedActivitiesForToDoList.forEach(todo => toDoList.push(todo))

    // Update timeLeft
    //console.log("Duration", this.sumActivityDuration(toDoList))
    timeLeft = time - this.sumActivityDuration(toDoList)

    // Step 3a: Check for activities that meet criteria in all activities
    let suggestedActivities = this.checkForAllActivities(this.state.allActivitiesFromDb, categories, timeLeft)
    //console.log("suggested", suggestedActivities)

    //Step 3b: Assess how many can be added to the todolist
    let suggestedActivitiesForToDoList = this.selectSuggestedActivitiesForToDoList(suggestedActivities, timeLeft)
    suggestedActivitiesForToDoList.forEach(todo => toDoList.push(todo))

    // Update timeLeft
    //console.log("Duration", this.sumActivityDuration(toDoList))
    timeLeft = time - this.sumActivityDuration(toDoList)

    //console.log("TimeLeft: ", timeLeft)
    //console.log("Todo List in function: ", toDoList)

    return toDoList

  }

  checkForHighPriorityToDos = (userActivities) => {
    //console.log("checking for HighPrioTodos...")
    //console.log("Activities I received to check for prio:", userActivities)
    return userActivities.filter(activity => activity.isHighPriority === true)
  }

  checkForSavedActivities = (userActivities, categories) => {
    //console.log("Checking for saved activities");
    //console.log("Activities I received to check for saved:", userActivities)

    let savedActivities = userActivities.filter(activity => {
      //console.log("Activity in savedActivities", activity)
      return categories.some(category => {
        //console.log("Category in savedActivities", category)
        return activity.activity.categories.includes(category)
      })
    }).filter(activity => activity.isHighPriority !== true)
    return savedActivities
  }

  checkForAllActivities = (allActivities, categories) => {
    //console.log("Checking for all activities");

    let suggestedActivities = allActivities
      .filter(activity => {
        return categories.some(category => {
          return activity.categories.includes(category)
        })
      })
    // .filter(activity => {
    //   // return only activities that are not already on the todolist
    // })

    return suggestedActivities
  }

  sumActivityDuration = (activities) => {
    //console.log("Sum, activtities passed in: ", activities)
    if (activities.length > 0) {
      let sum = 0
      activities.forEach(activity => {
        //console.log("each activity ", activity)
        if (activity?.activity?.minDuration) {
          sum = sum + activity.activity.minDuration
        } else {
          sum = sum + activity.minDuration
        }
      })
      return sum
    }
    return 0
  }

  selectSuggestedActivitiesForToDoList = (activities, timeLeft) => {
    //console.log("Activities in Select for toddo list", activities)
    //console.log("Timeleft in select: ", timeLeft)
    let activityDuration = this.sumActivityDuration(activities)
    //console.log("Duration in Function", activityDuration)

    if (activityDuration <= timeLeft) {
      return activities
    } else {
      activities.sort((todo1, todo2) => todo1.minDuration - todo2.minDuration)
      while (this.sumActivityDuration(activities) > timeLeft) {
        activities.pop() // Remove the most time-consuming activity
      }
      return activities
    }
  }

  selectActivitiesForToDoList = (activities, timeLeft) => {
    //console.log("Activities in Select for toddo list", activities)
    //console.log("Timeleft in select: ", timeLeft)
    let activityDuration = this.sumActivityDuration(activities)
    //console.log("Duration in Function", activityDuration)

    if (activityDuration <= timeLeft) {
      return activities
    } else {
      activities.sort((todo1, todo2) => todo1.activity.minDuration - todo2.activity.minDuration)
      while (this.sumActivityDuration(activities) > timeLeft) {
        activities.pop() // Remove the most time-consuming activity
      }
      return activities
    }
  }

  render() {

    let generatedToDoList = this.generateToDoList(this.props.availableTime, this.props.possibleCategories)
    console.log("Here is the generated TodoList: ", generatedToDoList)

    return (
      <div>
        <div>
          Here is your To Do List!
        Available time: {this.props.availableTime} min
        Selected Categories:
          <ul>
            {this.props.possibleCategories.map(category => <li>{category}</li>)}
          </ul>
        </div>
        {generatedToDoList ?
          <div id="todolist">
            {generatedToDoList.map(todo => <ToDoListItem todo={todo} />)}
          </div> : null}
      </div>
    )
  }
}

export default CreateToDoList;