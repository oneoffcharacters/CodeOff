import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';

import Home from '../client/components/Homepage';

describe('<Home />', () => {

  it('should render a <Header /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Header')).to.have.length(1);
  })

  it('should render a <Landing /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Landing')).to.have.length(1);
  })
})  