import React from 'react';
import DashboardHeader from './DashboardHeader';
import Leaderboard from './Leaderboard';
import Profile from './Profile';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <DashboardHeader />
        <button class="Start">Start Coding</button>
        <Leaderboard />
        <Profile />
      </div>
    )
  }
}

export default Dashboard