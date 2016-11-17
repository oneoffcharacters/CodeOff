import React from 'react';

export default class Profile extends React.Component {
  render() {
    return (
      <div>
        <h2>Profile</h2>

        <div className="ProfileContent">
          <div className="ProfileContentHeader">
            <h4>Wins</h4>
            <h4>Draws</h4>
            <h4>Losses</h4>
          </div>

          <div>
            <h4 className="ProfileContentTitle">Previous Games</h4>
          </div>

          <div className="ProfileContentMain">
            
          </div>
        </div>
      </div>
    )
  }
}

// ProfileContentMain: pass in props of a users' games and iterate over them and return an <li> with each matchup