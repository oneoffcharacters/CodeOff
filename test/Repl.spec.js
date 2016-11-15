import React from 'react';
import { expect, should } from 'chai';
import { mount, shallow, render } from 'enzyme';

import Repl from '../src/client/components/Repl';

describe('REPL Component', () => {
  it('should have a method for sending code to the REPL service', () => {
    expect(Repl).to.be.a('function');
    expect(Repl.prototype.startConsole).to.be.a('function');
    const wrapper = shallow(<Repl />);
    expect(wrapper).to.exist;
  })
})  

// test failing here, need to figure out why
