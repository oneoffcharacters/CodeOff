import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';

import DashboardHeader from '../src/client/components/DashboardHeader';

describe('<DashboardHeader />', () => {

  it('should exist', () => {
    const wrapper = shallow(<DashboardHeader />);
    expect(wrapper).to.exist;
  });

  it('should have an image to display the brand', function () {
    const wrapper = shallow(<DashboardHeader />);
    expect(wrapper.find('img')).to.have.length(1);
  });

  it('should have an initial src state', function () {
    const wrapper = mount(<DashboardHeader />);
    expect(wrapper.state().src).to.equal('https://media.glassdoor.com/sqll/843406/hack-reactor-squarelogo-1427844676793.png');
  });

}); 