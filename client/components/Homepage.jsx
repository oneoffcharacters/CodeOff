import React from 'react';
import Landing from './Landing';
import Header from './Header'

export default class Home extends React.Component {
  render() {
    return (
      <div className="HomePage">
        <Header />
        {this.props.children}
      </div>
    )
  }
}