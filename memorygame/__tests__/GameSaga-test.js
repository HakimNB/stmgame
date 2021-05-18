import 'react-native';
import {runSaga} from 'redux-saga';
import configureStore from 'redux-mock-store';

import * as GameAction from '@/modules/redux/game/game.action';
import GameTypes from '@/modules/redux/game/game.types';

import GameUtil from '@/modules/utils/gameUtil';

import {
  onGenerateBoardSaga,
  onSetCardStateSaga,
  onSetPairStateSaga,
} from '@/modules/redux/game/game.saga';

import {expect, it, jest} from '@jest/globals';

jest.useFakeTimers();

const middlewares = [];
const mockStore = configureStore(middlewares);

const row = 4;
const col = 3;
const min = 1;
const max = 100;
const index = 0;
const state = true;
const firstIndex = 0;
const secondIndex = 1;
const gameState = 0;

const mockGameState = {
  gameState: GameUtil.GameState.PLAYING,
  boardSteps: 0,
  boardOpenStatesFalse: [
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
  ],
  boardOpenStatesTrue: [
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
  ],
  boardNumbers: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6],
};

/* eslint-disable no-console */
describe('game saga testers', () => {
  it('generate board', async () => {
    const dispatched = [];
    const shuffleFn = jest
      .spyOn(GameUtil, 'generateRandomizedArray')
      .mockImplementation(() => [1, 2, 3, 4, 5, 6]);
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
      },
      onGenerateBoardSaga,
      {payload: {row, col, min, max}},
    );
    // console.log(result);
    // console.log(dispatched);
    // GameUtil.shuffleInPlace([1, 2, 3]);
    expect(shuffleFn).toHaveBeenCalledTimes(1);
    expect(
      dispatched.find((el) => el.type === 'SET_BOARD_OPENSTATES').payload
        .length,
    ).toBe(12);
    expect(
      dispatched.find((el) => el.type === 'SET_BOARD_NUMBERS').payload.length,
    ).toBe(12);
    expect(dispatched.find((el) => el.type === 'SET_BOARD_STEPS').payload).toBe(
      0,
    );
    expect(dispatched.find((el) => el.type === 'SET_GAME_STATE').payload).toBe(
      1,
    );

    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch({type: 'GENERATE_BOARD', payload: {row, col, min, max}});

    const actions = store.getActions();
    const states = store.getState();
    console.log(actions);
    console.log(states);
    console.log(store);
  });

  it('set card state', async () => {
    const initialState = {};
    const store = mockStore(initialState);
    store.dispatch({type: 'SET_CARD_STATE', payload: {index, state}});
    const actions = store.getActions();
    const states = store.getState();
    console.log(actions);
    console.log(states);
    console.log(store);

    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({
          game: {
            ...mockGameState,
            boardOpenStates: mockGameState.boardOpenStatesFalse,
          },
        }),
      },
      onSetCardStateSaga,
      {payload: {index, state}},
    );
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({
          game: {
            ...mockGameState,
            boardOpenStates: mockGameState.boardOpenStatesTrue,
          },
        }),
      },
      onSetCardStateSaga,
      {payload: {index, state}},
    );
    console.log(dispatched);
  });

  it('set pair state', async () => {
    const dispatched = [];
    await runSaga(
      {
        dispatch: (action) => dispatched.push(action),
        getState: () => ({
          game: {
            ...mockGameState,
            boardOpenStates: mockGameState.boardOpenStatesFalse,
          },
        }),
      },
      onSetPairStateSaga,
      {payload: {firstIndex, secondIndex, state}},
    );
    console.log(dispatched);
  });

  it('should create actions correctly', () => {
    const generateBoardAction = {
      type: GameTypes.GENERATE_BOARD,
      payload: {row, col, min, max},
    };
    const setCardStateAction = {
      type: GameTypes.SET_CARD_STATE,
      payload: {index, state},
    };
    const setPairState = {
      type: GameTypes.SET_PAIR_STATE,
      payload: {firstIndex, secondIndex, state},
    };
    const setGameState = {
      type: GameTypes.SET_GAME_STATE,
      payload: gameState,
    };
    expect(GameAction.generateBoard(row, col, min, max)).toEqual(
      generateBoardAction,
    );
    expect(GameAction.setCardState(index, state)).toEqual(setCardStateAction);
    expect(GameAction.setPairState(firstIndex, secondIndex, state)).toEqual(
      setPairState,
    );
    expect(GameAction.setGameState(gameState)).toEqual(setGameState);
  });
});
