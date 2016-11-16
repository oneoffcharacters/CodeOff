import React from 'react';

export default class Profile extends React.Component {
  render() {
    return (
      <div>
<<<<<<< 052cb3b4a573063f76cfc5c99d9fa9194c926e0a
<<<<<<< ef475d1fbd5b90080f1e1f5cff57ca3ead3bfd9a
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
||||||| merged common ancestors
        <h1>Profile</h1>
=======
        <h1>Profile</h1>
||||||| merged common ancestors
        <h1>Profile</h1>
=======
        <h2>Profile</h2>
>>>>>>> Adds styling to Dashboard

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
>>>>>>> Adds styling for dashboard page
      </div>
    )
  }
}

// ProfileContentMain: pass in props of a users' games and iterate over them and return an <li> with each matchup