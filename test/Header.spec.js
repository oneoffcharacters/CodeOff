import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Header from '../src/client/components/Header';

describe('<Header />', () => {

  it('should exist', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).to.exist;
  });

});