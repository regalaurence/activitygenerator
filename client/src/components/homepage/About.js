import React from 'react'
import Login from '../auth/Login'
import Signup from '../auth/Signup'
import {Link} from 'react-router-dom';

class About extends React.Component {

  render() {
    return (
    
          <div className="column">
            <div className="title is-3">
              <h1>Welcome to <strong>Make Me Do!</strong></h1>
            </div>
            <div>
              <p>Ever had some free time on your hands but no idea what to do with it, hence did nothing at all and ended up regretting it?</p>
              <p>Those days are over! <br />
                <strong>Make Me Do!</strong> comes to the rescue, by generating tailor-made to-do-lists according to how much free time you have ahead.</p>
              <p>Yup, tailor made. JUST-FOR-YOU.</p>
              <ul>
                <li>Browsing our awesome activities database</li>
                <li>Matching it with your preferences</li>
                <li>Letting you add, edit and bookmark activities</li>
                <li>Crosschecking how much of a priority it is for you to do this or that</li>
                <li>And much more</li>
              </ul>
              <p>We promise you, "I dont' know what to do" wont be part of your vocabulary anymore.</p>
              <p>Because, honey... <strong>Make Me Do !</strong> will make you do.</p>
            </div>
            <div>
              <Link to="/signup"><button className="button is-primary">Sign me up!</button></Link>
              <Link to="/login"><button className="button">Log in</button></Link>
            </div>
          </div>
        
    )
  }
}

export default About