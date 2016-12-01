// import packages
import React from 'react';

// import components
import DashboardHeader from './DashboardHeader';
import Leaderboard from './Leaderboard';
import Profile from './Profile';

export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <DashboardHeader />
        <button className="DashboardStartButton">Start Coding</button>
        <div className="DashboardMainComponents">
          <Leaderboard />
          <Profile />
        </div>
      </div>
    )
  }
}
