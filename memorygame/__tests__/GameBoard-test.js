import 'react-native';
import React from 'react';
import GameBoard from '@/components/card/Card';
import GameUtil from '@/modules/utils/gameUtil';

import renderer from 'react-test-renderer';

import {expect, it, jest} from '@jest/globals';

jest.useFakeTimers();

it('renders correctly', () => {
  const col = 3;
  const row = 4;
  const boardWidth = 720;
  const boardHeight = 1280;
  const boardNumbers = [61, 87, 41, 22, 40, 66, 22, 61, 87, 41, 40, 66];
  const boardSteps = 0;
  const stateArray = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  const gameState = GameUtil.GameState.PLAYING;
  const resetPair = jest.fn(() => {});
  const toggleCard = jest.fn(() => {});

  // const {getByText} = render(<GameBoard row={row} col={col} boardWidth={boardWidth} boardHeight={boardHeight} boardNumbers={boardNumbers} boardSteps={boardSteps} stateArray={stateArray} gameState={gameState} resetPair={resetPair} toggleCard={toggleCard}/>);
  // const label = getByText(/\\?\\?/i);
  // fireEvent.press(label);
  const tree = renderer.create(
    <GameBoard
      row={row}
      col={col}
      boardWidth={boardWidth}
      boardHeight={boardHeight}
      boardNumbers={boardNumbers}
      boardSteps={boardSteps}
      stateArray={stateArray}
      gameState={gameState}
      resetPair={resetPair}
      toggleCard={toggleCard}
    />,
  );
  // const tree = renderer.create(<GameBoard/>);
  expect(tree).toMatchSnapshot();
});
