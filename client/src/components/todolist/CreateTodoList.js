import React, { Component } from 'react';
import axios from 'axios';
import ToDoListItem from './ToDoListItem';
import { withRouter } from 'react-router-dom'

class CreateToDoList extends Component {
  // CreateToDoList receives the available time, possibleCategories and user as props
  // Calls for useractivities & allactivites from backend and sets as state

  state = {
    userActivitiesFromDb: [],
    allActivitiesFromDb: []
  }

  // Call to backend to get allactivities

  componentDidMount = () => {
    console.log("mounting")
    console.log("User in todolist", this.props.user)
    axios.get('/api/activities')
      .then(response => {
        console.log("Repsonse from backend: ", response.data)
        this.setState({
          allActivitiesFromDb: response.data,
          userActivitiesFromDb: this.props.user.bookmarkedActivities
        })
      })
     
  }

  // removeFromFavorites = (todoId) => {
  //   this.props.removeFromFavorite(todoId)
  //   this.setState({
  //     userActivitiesFromDb: this.props.user.bookmarkedActivities
  //   })
  // }

  handleTodoCheck = (todoId, isTodoChecked) => {
    console.log("Calling handle todo check", todoId)
    this.setState({
      [todoId]: isTodoChecked
    })
    console.log("Calling removefavorites")
    this.props.removeFromFavorite(todoId)
  }

  // Functions that generate todo list as Class Methods for CreateToDoList

  generateToDoList = (time, categories) => {

    console.log("State: ", this.state.userActivitiesFromDb)

    if (this.state.userActivitiesFromDb.length === 0 && this.state.allActivitiesFromDb.length === 0) {
      return [];
    }

    let now = new Date()
    let currentMonth = now.getMonth()
    let currentHour = now.getHours()

    let toDoList = [];
    let timeLeft = time;

    //Step 0a Filter activities for current season
    let userActivitiesFilteredForSeason = this.state.userActivitiesFromDb.filter(activity => {
      return activity.seasonStart <= currentMonth && activity.seasonEnd >= currentMonth
    })

    let allActivitiesFilteredForSeason = this.state.allActivitiesFromDb.filter(activity => {
      return activity.seasonStart <= currentMonth && activity.seasonEnd >= currentMonth
    })

    //Step0b Filter activites for time
    let userActivitiesFilteredForTime = userActivitiesFilteredForSeason.filter(activity => {
      return activity.timeWindowStart <= currentHour && activity.timeWindowEnd >= currentHour
    })

    let allActivitiesFilteredForTime = allActivitiesFilteredForSeason.filter(activity => {
      return activity.timeWindowStart <= currentHour && activity.timeWindowEnd >= currentHour
    })

    // Update below with filtered activities once database is reseeded

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
    let suggestedActivities = this.checkForAllActivities(this.state.allActivitiesFromDb, categories, toDoList)
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
        return activity.categories.includes(category)
      })
    }).filter(activity => activity.isHighPriority !== true)
    return savedActivities
  }

  checkForAllActivities = (allActivities, categories, todolist) => {
    //console.log("Checking for all activities");
    console.log("Todolist: ", todolist)
    let filteredActivities = allActivities
      .filter(activity => {
        console.log("running")
        return categories.some(category => {
          return activity.categories.includes(category)
        })
      })

    let suggestedActivities = filteredActivities
      .filter(suggestion => {
        console.log("suggestion 1", suggestion)
        return todolist.every(todo => {
          console.log("todo in second filter", todo)
          return todo._id !== suggestion._id
        })
      })
    console.log("Here are my suggestions: ", suggestedActivities)
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
      activities.sort((todo1, todo2) => todo1.minDuration - todo2.minDuration)
      while (this.sumActivityDuration(activities) > timeLeft) {
        activities.pop() // Remove the most time-consuming activity
      }
      return activities
    }
  }

  render() {

    let generatedToDoList = this.generateToDoList(this.props.timeForTodoList, this.props.categoriesForTodoList)
    console.log("Here is the generated TodoList: ", generatedToDoList)

    return (
      <div className="hero-body">
        <div className="container">
          <div className="columns is-vcentered is-centered center">
            <div className="box">
              <article className="media pr-2">
                {/* <div class="media-right">
                <figure class="image is-64x64">
                  <img src="/images/Todo.png" alt="Image" />
                </figure>
              </div> */}
                <div className="media-content">
                  <div className="content">
                    <p>
                      <h3><strong>Here is your To Do List:</strong></h3>
                      <br></br>
                      <strong>Available time:</strong> {this.props.timeForTodoList} min <br></br>
                      <strong>Selected Categories: </strong>
                      {this.props.categoriesForTodoList.map(category => <> {category} </>)}
                    </p>
                    {generatedToDoList ?
                      <div id="todolist">
                        {generatedToDoList.map(todo => <ToDoListItem onCheck={this.handleTodoCheck} todo={todo} />)}
                      </div> : null}

                  </div>
                </div>
                <div className="media-right">
                  <figure className="image is-64x64 ml-4 mr-2">
                    <img src="/images/Todo.png" alt="logo" />
                  </figure>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>

    )
  }
}

export default withRouter(CreateToDoList);
