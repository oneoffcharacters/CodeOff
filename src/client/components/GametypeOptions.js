import React from 'react';

const GametypeOptions = ({ startFreshGame , terminateGame}) => {
  const gameTypes = ['Solo', 'Battle']
  
  return (
    <div className="dropdown dropdown-inline">
      <button id="gameoptions" className="btn btn-secondary fa fa-bars" type="button" data-toggle="dropdown"></button>
      <ul className="dropdown-menu">
      {gameTypes.map((type, i) => (
        <li key = {i} onClick={() => startFreshGame(type)}>{type}</li>
      ))}
        <li className="divider"></li>
        <li onClick={() => terminateGame(false)} >End Game</li>
      </ul>
    </div>
  )
}

export default GametypeOptions