import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

// import 

configure({ adapter: new Adapter() });

describe('Hello, Enzyme!', () => {
  it('renders', () => {
    const wrapper = shallow(<div>
      <h1>Hello, Enzyme!</h1>
    </div>);
    expect(wrapper.find('h1').html()).toMatch(/Hello, Enzyme/);
    });
});

describe('React unit tests', () => {

});