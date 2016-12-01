// import packages
import React from 'react';

// import components
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

export default class Landing extends React.Component {
  render() {
    return (
      <div className="LandingHide">
        <Hero />
        <Features />
        <Footer />
      </div>
    )
  }
}
