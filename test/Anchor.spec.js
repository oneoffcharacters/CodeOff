import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';

import Anchor from '../client/components/Anchor';

describe('<Anchor />', () => {

  it('should render the title correctly', () => {
    const wrapper = shallow(<Anchor />);
    // expect(wrapper.find('h1')).to.have.length(1);
    expect(wrapper.find('h1').text()).to.equal('HELLO WEBPACK');
  })
  
  it('should render the <Home /> component', () => {
    const wrapper = shallow(<Anchor />);
    expect(wrapper.find('Home')).to.have.length(1);
    // console.log(wrapper);
  }) 
});