import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
// import sinon from 'sinon';

import Hero from '../src/client/components/Hero';

describe('<Hero />', () => {
  const swrapper = shallow(<Hero />);
  const mwrapper = mount(<Hero />);

  it('should render two buttons', () => {
  	expect(swrapper.find('button')).to.have.length(2);
  })

});