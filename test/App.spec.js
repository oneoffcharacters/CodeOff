import React from 'react';
import { expect } from 'chai';
import { mount, shallow, render } from 'enzyme';
// import sinon from 'sinon';

import Home from '../src/client/components/Homepage';

describe('<App />', () => {

  // let sandbox;

  // beforeEach(() => {
  //   sandbox = sinon.sandbox.create()

  //   sandbox.stub(console, 'error', (message) => {
  //     throw new Error(message)
  //   })    
  // });

  //   afterEach(() => {
  //   sandbox.restore()
  // })

  it('should exist', () => {
    const wrapper = shallow(<Home />)
    expect(wrapper).to.exist
  })

  it('should render a <Header /> component', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('Header')).to.have.length(1);
  })

  // todo: figure out how to test for this.props.children
});  