// import packages
import React from 'react';

const Powerups = ({powerups, usePowerup, currentGameType}) => {
  const powerupList = Object.keys(powerups)

    return (
      <div className="dropdown dropdown-inline" >
        <button id="powerup" className="btn btn-secondary" type="button" data-toggle="dropdown" style={(currentGameType != 'Battle') ? {display:'none'} : {}}></button>
        <ul className="dropdown-menu">
        {powerupList.map((powerup, i) => (
          <li key = {i} onClick={() => usePowerup(powerup)}>{powerup + ": " + powerups[powerup].quantity}</li>
        ))}
        </ul>
      </div>
    )
  } 

export default Powerups
