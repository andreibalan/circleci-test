import React from 'react';
import { shallow } from 'enzyme';

import Button from './Button';

describe('Button', () => {

  it('render a button', () => {
    const wrapper = shallow(<Button loading />);
    // expect(wrapper).toMatchSnapshot();

  });

});

