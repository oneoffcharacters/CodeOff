import React from 'react';
import DashboardHeader from './DashboardHeader';
import Leaderboard from './Leaderboard';
import Profile from './Profile';

class Dashboard extends React.Component {
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

export default Dashboard