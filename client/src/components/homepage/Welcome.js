import React from 'react'
import About from './About'
import "bulma";

class Welcome extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="columns is-vcentered is-centered has-text-centered">

          <div className="column">
            <div className="is-vcentered">
              <figure className="image">
                <img style={{ maxWidth: "512px" }} src="/images/CloudFinalDarkText.png" />
              </figure>

            </div>
          </div>
      <About/>
      </div>
      </div>
    )
}
}

export default Welcome