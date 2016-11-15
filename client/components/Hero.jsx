import React from 'react';

export default class Hero extends React.Component {
  render() {
    return (
      <div className="Hero">
        <div>
          <h1 className="HeroText">Compete in code competitions in real time across the globe</h1>
        </div>

        <button className="PlayNow" type="submit">Play Now</button>
        <button className="LearnMore" type="submit">Learn More</button>
      </div>
    )
  }
}