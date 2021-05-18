import 'react-native';
import React from 'react';
import Card from '@/components/card/Card';

import renderer from 'react-test-renderer';

jest.useFakeTimers();

test('match snapshot', () => {
  const tree = renderer.create(<Card />).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly', () => {
  renderer.create(<Card />);
});
