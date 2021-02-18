import React from 'react'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import {Link} from 'react-router-dom';

class About extends React.Component {

  render() {
    return (
    
          <div className="column has-text-centered" style={{ maxWidth: "512px" }}>
            <div className="title is-3">
              <h1>Welcome to <strong>Make Me Do!</strong></h1>
            </div>
            <div >
              <p>Ever had some free time on your hands but no idea what to do with it, hence did nothing at all and ended up regretting it? Those days are over! <br /><br />
                <strong>Make Me Do!</strong> comes to the rescue, by generating tailor-made to-do-lists according to how much free time you have ahead.
              Yup, tailor made. JUST-FOR-YOU. <br/><br/>
              
                Browsing our awesome activities database, matching it with your preferences,
                letting you add, edit and bookmark activities,
                crosschecking how much of a priority it is for you to do this or that
                and much more.<br/><br/>
              
              We promise you, "I dont' know what to do" won't be part of your vocabulary anymore.
              <br /><br />Because, honey... <strong>Make Me Do !</strong> will make you do.</p>
            </div>
            <div>
              <Link to="/signup"><button className="button is-primary mr-3 mt-4">Sign me up!</button></Link>
              <Link to="/login"><button className="button mt-4">Log in</button></Link>
            </div>
          </div>
        
    )
  }
}

export default About