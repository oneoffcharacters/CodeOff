import React from 'react';

export default class Leaderboard extends React.Component {
  render() {
    return (
      <div>
        <h2>Leaderboard</h2>

        <div className="LeaderboardContent">
          <div className="LeaderboardContentHeader">
            <h4>Rank</h4>
            <h4>User</h4>
            <h4>Score</h4>
          </div>

          <div className="LeaderboardContentMain">
            
          </div>

        </div>

      </div>
    )
  }
}

// LeaderboardContentMain: pass in props of all users and iterate over them and return an <li> with rank, user and score