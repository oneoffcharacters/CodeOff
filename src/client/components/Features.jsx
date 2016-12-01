// import packages
import React from 'react';

export default class Features extends React.Component {
  render() {
    return (
      <div className="Features">
        <h2 className="features-heading">Get Pro, And Prove It To Others</h2>
        <div className="features">
          <div>
            <h4 className="feature-title">COMPETE</h4>
            <p className="feature-text">Compete against friends, <br />random people from across the globe or yourself.</p>
          </div>

          <div>
            <h4 className="feature-title">IMPROVE</h4>
            <p className="feature-text">Challenge yourself with real problems <br />and discuss them with your competition afterward to always improve.</p>
          </div>

          <div>
            <h4 className="feature-title">SHOWCASE</h4>
            <p className="feature-text">Showcase your victories to future employers. <br />They will be able to see your ranking and your victories.</p>
          </div>
        </div>
      </div>
    )
  }
}
// add icons to feature-title's
