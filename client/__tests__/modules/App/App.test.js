test('render a label', () => {
  const wrapper = shallow(
    <Label>Hello Jest!</Label>
  );
  expect(wrapper).toMatchSnapshot();
});

test('render a small label', () => {
  const wrapper = shallow(
    <Label small>Hello Jest!</Label>
  );
  expect(wrapper).toMatchSnapshot();
});

test('render a grayish label', () => {
  const wrapper = shallow(
    <Label light>Hello Jest!</Label>
  );
  expect(wrapper).toMatchSnapshot();
});
