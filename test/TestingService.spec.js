const vm = require('vm');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should;
const mocha = require('mocha');
const describe = mocha.describe;
const it = mocha.it;

const code = 'describe("test", () => { it("should be true", () => { expect(true).to.be.true }) })';

const script = new vm.Script(code);

console.log(script.runInNewContext({ describe, it, expect, should }))
