// import packages
import React from 'react';

export default class DashboardHeader extends React.Component {
  constructor() {
  	super();
  	this.state = {
  		src: 'https://media.glassdoor.com/sqll/843406/hack-reactor-squarelogo-1427844676793.png'
  	}
  }

  render() {
    return (
      <div className="DashboardHeader">
        <h1 className="DashboardHeaderName">CodeOff</h1>
        <img className="DashboardHeaderPicture" src={this.state.src}></img>
      </div>
    )
  }
}
// DashboardHeaderPicture will come from the currently logged in user's state
