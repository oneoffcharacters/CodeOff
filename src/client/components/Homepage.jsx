// import packages
import React from 'react';

// import components
import Landing from './Landing';
import Header from './Header'

export default class Home extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <Header />
      </div>
    )
  }
}
