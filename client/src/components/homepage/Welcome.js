import React from 'react'
import About from './About'

class Welcome extends React.Component {

  render() {
    return (
      <section className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-vcentered is-centered center">
              <figure className="image mb-4">
                <img style={{ maxWidth: "312px" }} src="images/BlueCloudDarkSignup.png" />
              </figure>
            </div>
            <div className="columns is-vcentered is-centered center">
              <About />
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default Welcome