import React from 'react';

export default class DashboardHeader extends React.Component {
  render() {
    return (
      <div className="DashboardHeader">
        <h1 className="DashboardHeaderName">CodeOff</h1>
        <img className="DashboardHeaderPicture" src="https://media.glassdoor.com/sqll/843406/hack-reactor-squarelogo-1427844676793.png"></img>
      </div>
    )
  }
}