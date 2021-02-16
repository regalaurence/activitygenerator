import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import AddActivity from './createactivities/NewActivityForm';
import AllActivities from './AllActivities';
import MyActivities from './MyActivities';
import MakeMeDo from './todolist/MakeMeDo';

class Home extends Component {

    render() {

        return (
            <section className="hero is-fullheight">
                <div className="hero-body">
                    <div className="container">
                        <div className="columns is-vcentered is-centered center">
                            <figure className="image is-vcentered is-centered has-text-centered mb-6">
                                <Link to="/make-me-do"> <img style={{ maxWidth: "512px" }} src="images/CloudFinalDarkText.png" /></Link>
                            </figure>
                        </div>
                        <div className="is-vcentered is-centered">
                            <div className="columns is-vcentered is-centered has-text-centered">

                                <Link to="/make-me-do" className="button is-light mt-2">Make me DO something</Link><br></br>
                            </div>
                            <div className="columns is-vcentered is-centered has-text-centered">
                                <Link to="/activities" className="button is-light mt-2">Browse activities</Link><br></br>
                            </div>
                            <div className="columns is-vcentered is-centered has-text-centered">
                                <Link to="/add-activity" className="button is-light mt-2">Create an Activity</Link><br></br>
                            </div>
                            <div className="columns is-vcentered is-centered has-text-centered">
                                <Link to="/my-activities" className="button is-light mt-2">My activities</Link><br></br>
                            </div>
                        </div>
                    </div>
                </div>


            </section>
        );
    }
}
export default Home;