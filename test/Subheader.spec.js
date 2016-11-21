import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';

import Subheader from '../src/client/components/Subheader';

describe('<Subheader />', () => {
  it('should render four buttons', () => {
    const wrapper = render(<Subheader />);
    expect(wrapper.find('button')).to.have.length(3);
  })

  it('should be able to accept click handlers as props', () => {
    const tester = sinon.spy();
    const wrapper = mount(<Subheader sendCode={tester} />)
    expect(wrapper.prop('sendCode')).to.eql(tester);
  })

  it('should have props for sendCode and pairMe', function () {
    const wrapper = shallow(<Subheader />);
    expect(wrapper.props().sendCode).to.be.defined;
    expect(wrapper.props().pairMe).to.be.defined;
  });

  it('should fire runCode event handler when button.runCodeBtn is clicked', () => {
    const tester = sinon.spy();
    const wrapper = mount(<Subheader runCode={tester} />);
    wrapper.find('button.runCodeBtn').simulate('click');
    expect(tester.calledOnce).to.equal(true);
  })

  it('should render a GametypeOptions component', () => {
    const wrapper = shallow(<Subheader />);
    expect(wrapper.find('GametypeOptions')).to.have.length(1);
  });

})


