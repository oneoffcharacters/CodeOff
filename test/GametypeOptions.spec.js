import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
import sinon from 'sinon';

import GametypeOptions from '../src/client/components/GametypeOptions';

describe('<GametypeOptions />', () => {
  const swrapper = shallow(<GametypeOptions />);

  it('should succesfully map and render four li elements', () => {
    expect(swrapper.find('li')).to.have.length(4);
  });

  it('should have props for startGame and endGame', function () {
    expect(swrapper.props().startGame).to.be.defined;
    expect(swrapper.props().endGame).to.be.defined;
  });

  it('should start a solo game when the solo li is clicked', () => {
    const tester = sinon.spy();
    const wrapper = mount(<GametypeOptions startGame={tester} endGame={tester} />);
    wrapper.find('li').at(0).simulate('click');
    expect(tester.calledOnce).to.equal(true);
  });

  it('should start a battle game when the battle li is clicked', () => {
    const tester = sinon.spy();
    const wrapper = mount(<GametypeOptions startGame={tester} endGame={tester} />);
    wrapper.find('li').at(1).simulate('click');
    expect(tester.calledOnce).to.equal(true);
  });

});