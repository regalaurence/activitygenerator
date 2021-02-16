import React, { Component } from 'react';
import "bulma";

class Footer extends Component {
  render() {

    return (
<footer className="footer mt-5" style={{ maxHeight: "122px" }}>
  <div className="content has-text-centered is-small">
    <p>
      <strong>Make me do!</strong> by Anita, Laurence and Tina. <br></br>The source code is licensed
      <a href="http://opensource.org/licenses/mit-license.php"> MIT</a>. The website content
      uses graphic material <a href="http://www.anitamikas.com"> designed by anitam, </a> <a href="http://www.freepik.com"> slidesgo and </a>
      <a href="http://www.freepik.com">rawpixel.com / Freepik</a>
    </p>
  </div>
</footer>
    )
  }
}
export default Footer;