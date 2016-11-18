import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
// import sinon from 'sinon';

import Landing from '../src/client/components/Landing';

describe('<Landing />', () => {
  const swrapper = shallow(<Landing />);
  const mwrapper = mount(<Landing />);

  it('should render the Hero component', () => {
    expect(swrapper.find('Hero')).to.have.length(1);
  });

  it('should render the Features component', () => {
    expect(swrapper.find('Features')).to.have.length(1);
  });

  it('should render the Footer component', () => {
    expect(swrapper.find('Footer')).to.have.length(1);
  });

});