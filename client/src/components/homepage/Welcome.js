import React from 'react'
import About from './About'

class Welcome extends React.Component {

  render() {
    return (
      <div className="container">
        <h1>Welcome to <strong>Make Me Do!</strong></h1>
        <p>Ever had some free time on your hands but no idea what to do with it, hence did nothing at all and ended up regretting it?</p>
        <p>Those days are over! <br/>
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
    )
  }
}

export default Welcome