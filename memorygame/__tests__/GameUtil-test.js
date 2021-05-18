import 'react-native';
import GameUtil from '@/modules/utils/gameUtil';

import {expect, jest} from '@jest/globals';

jest.useFakeTimers();

/* eslint-disable no-console */
test('generate random numbers correctly for the game', () => {
  const col = 3;
  const row = 4;
  const min = 1;
  const max = 100;
  const halfArray = GameUtil.generateRandomizedArray((col * row) / 2, min, max);
  const fullArray = [...halfArray, ...halfArray];
  const shuffledArray = GameUtil.shuffleInPlace(fullArray);
  const mappedArray = GameUtil.splitToRowAndCol(shuffledArray, row, col);
  expect(shuffledArray.length).toBe(12);
  shuffledArray.map((el) => {
    expect(shuffledArray.filter((e) => e === el).length).toBe(2);
  });
  expect(mappedArray.length).toBe(4);
  mappedArray.map((arr) => {
    expect(arr.length).toBe(3);
  });
  console.log(mappedArray);
});
