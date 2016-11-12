import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';

import Home from '../client/components/HomePage';

describe('<Home />', () => {

  it('should render a <Header /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Header')).to.have.length(1);
  })
})