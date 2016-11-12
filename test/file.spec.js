import React from 'react';
import { expect } from 'chai';
import { mount, shallow } from 'enzyme';

import Anchor from '../client/components/Anchor';
import Test from '../client/components/test';

describe('<Anchor />', () => {
  it('should', () => {
    const wrapper = shallow(<Anchor />);
    expect(wrapper);
  })
});