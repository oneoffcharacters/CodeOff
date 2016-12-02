// import packages
import React from 'react';
import {Link} from 'react-router';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <div className="Footer-Brand">
          <h1 className="footer-name">Code<span className="foot-nameAlt">Off</span></h1>
        </div>
        <div className="Footer-About">
          <p className="AboutUs">ABOUT US</p>
          <p className="AboutUsText">We want to make people awesome at coding. So here we are.</p>
        </div>
        <div className="Footer-Question">
          <Link to="/aboutus"><button className="QuestionButton" type="submit">Meet the Team</button></Link>
        </div>
      </div>
    )
  }
}
