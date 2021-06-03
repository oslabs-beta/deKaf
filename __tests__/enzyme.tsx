import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import MemoryRouter from 'react-router-dom';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import toJson from 'enzyme-to-json';

import UserPage from '../src/components/UserPage/UserPage';
import LeftNav from '../src/components/UserPage/LeftNav';
import Gallery from '../src/components/UserPage/Gallery';
import BrokerDetails from '../src/components/UserPage/BrokerDetails';

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
  describe('UserPage', () => {
    let wrapper;

    beforeAll(() => {
      wrapper = shallow(<UserPage />)
    });

    it('Renders a <div> tag with id user-wrapper', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('#user-wrapper'));
    });
  });
  
  describe('LeftNav', () => {
    let wrapper;
    
    beforeAll(() => {
      wrapper = shallow(<LeftNav />)
    });

    it('Renders a <nav> tag', () => {
      expect(wrapper.type()).toEqual('nav');
    });

    it('Contains 3 <div> components', () => {
      expect(wrapper.find('div')).toHaveLength(3);
    });
  });

  describe('Gallery', () => {
    let wrapper;

    it('Renders a <div> tag with class gallery', () => {
      wrapper = shallow(<Gallery />);
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('.gallery'));
    });

    // it('Routes to different gallery views based on endpoint', () => {
    //   wrapper = shallow(<Gallery />);

    //   <MemoryRouter initialEntries='/details'>
    //     <Gallery />
    //   </MemoryRouter>

    //   expect(wrapper.find(BrokerDetails)).toHaveLength(1);
    // });
  });

  describe('BrokerDetails', () => {
    let wrapper = shallow(<BrokerDetails />);

    it('Renders a <div> tag with id broker-wrapper', () => {
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.find('#broker-wrapper'));
    });
  })

});