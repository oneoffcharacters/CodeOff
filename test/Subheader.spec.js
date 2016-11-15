import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';

import Subheader from '../src/client/components/Subheader';

describe('<Subheader />', () => {
  it('should render two buttons', () => {
    const wrapper = render(<Subheader />);
    expect(wrapper.find('button')).to.have.length(2);
  })

  it('should fire event handler when submit button is clicked', () => {
    const tester = sinon.spy();
    const wrapper = mount(<Subheader sendCode={tester} />);
    wrapper.find('button.sendCodeBtn').simulate('click');
    expect(tester.calledOnce).to.equal(true);
  })

})


