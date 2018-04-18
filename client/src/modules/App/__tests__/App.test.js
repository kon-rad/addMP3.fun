import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders properly ', () => {
  const wrapper = shallow(
    <App />
  );

  t.is(wrapper.find('h1').length, 1);
  t.is(wrapper.find('InputBox').length, 1);
})
