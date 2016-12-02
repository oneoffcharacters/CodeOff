// import packages
import React from 'react';
import { Link } from 'react-router';

export default class Hero extends React.Component {
  render() {
    return (
      <div className="Hero">
        <h1 className="HeroText">Compete in Code<br />Competitions in real<br />time across the globe.</h1>
        <div className="HeroButtons">
          <Link to="/gameroom"><button className="PlayNow" type="submit">Play Now</button></Link>
          <Link to="/lobby"><button className="LearnMore" type="submit">View Lobby</button></Link>
          <Link to="/addchallenge"><button className="AddChallengeBtn" type="submit">Add A Challenge</button></Link>
        </div>
      </div>
    )
  }
}
