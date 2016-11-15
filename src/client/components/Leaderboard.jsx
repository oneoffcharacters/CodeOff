import React from 'react';

export default class Leaderboard extends React.Component {
  render() {
    return (
      <div>

        <h1>Leaderboard</h1>

        <div className="LeaderboardContent">
          <div className="LeaderboardContentHeader">
            <h2>Rank</h2>
            <h2>User</h2>
            <h2>Score</h2>
          </div>
        </div>

      </div>
    )
  }
}