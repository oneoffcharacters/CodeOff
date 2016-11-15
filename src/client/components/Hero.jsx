import React from 'react';

export default class Hero extends React.Component {
  render() {
    return (
      <div className="Hero">
        <h1 className="HeroText">Compete in code</h1>
        <h1 className="HeroText">competitions in real</h1>
        <h1 className="HeroText">time across the globe.</h1>

        <div className="HeroButtons">
          <button className="PlayNow" type="submit">Play Now</button>
          <button className="LearnMore" type="submit">Learn More</button>
        </div>
      </div>
    )
  }
}