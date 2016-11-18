import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
// import sinon from 'sinon';

import Dashboard from '../src/client/components/Dashboard';

describe('<Dashboard />', () => {
  const swrapper = shallow(<Dashboard />);
  const mwrapper = mount(<Dashboard />);

  it('should render the DashboardHeader component', () => {
    expect(swrapper.find('DashboardHeader')).to.have.length(1);
  });

  it('should render the Leaderboard component', () => {
    expect(swrapper.find('Leaderboard')).to.have.length(1);
  });

  it('should render the Profile component', () => {
    expect(swrapper.find('Profile')).to.have.length(1);
  });

  it('should render one button', () => {
    expect(swrapper.find('button')).to.have.length(1);
  });    

});