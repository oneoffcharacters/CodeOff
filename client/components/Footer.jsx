import React from 'react';

export default class Footer extends React.Component {
  render() {
    return (
      <div className="Footer">
        <div>
          <h1 className="footer-name">CodeOff</h1>
        </div>

        <div>
          <p className="AboutUs">ABOUT US</p>
          <p className="AboutUsText">We want to make people awesome at coding. So here we are.</p>
        </div>

        <div>
          <button className="QuestionButton" type="submit">Ask Question</button>
        </div>
      </div>
    )
  }
}