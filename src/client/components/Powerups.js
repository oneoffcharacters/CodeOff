import React from 'react';

const Powerups = ({ powerups, usePowerup }) => {
  const powerupList = Object.keys(powerups)
  
  return (
    <div className="dropdown dropdown-inline">
      <button id="gameoptions" className="btn btn-secondary fa fa-bars" type="button" data-toggle="dropdown"></button>
      <ul className="dropdown-menu">
      {powerupList.map((powerup, i) => (
        <li key = {i} onClick={() => usePowerup(powerup)}>{powerup}</li>
      ))}
      </ul>
    </div>
  )
}

export default Powerups