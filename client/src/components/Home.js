import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AddActivity from './createactivities/NewActivityForm';
import CreateTodoList from './todolist/CreateTodoList';
import AllActivities from './AllActivities';
import MyActivities from './MyActivities';

class Home extends Component {
    render()
{    return (
        <div>
            <div>
        <Link to="/make-me-do">Make me DO something</Link><br></br>
        <Link to="/activities">Browse activities</Link><br></br>
        <Link to="/add-activity">Create an Activity</Link><br></br>
        <Link to="/my-activities">My activities</Link><br></br>
        </div>
        {/* <Route path="/make-me-do" component={CreateTodoList}></Route> */}
        <Route path="/activities" component={AllActivities}></Route>
        <Route path="/add-activity" component={AddActivity}></Route>
        <Route path="/my-activities" component={MyActivities}></Route>
        </div>
    );}
}
export default Home;