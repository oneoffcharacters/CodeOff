import React from 'react';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';

export default class Landing extends React.Component {
  render() {
    return (
      <div>
        <Hero />
        <Features />
        <Footer />
      </div>
    )
  }
}