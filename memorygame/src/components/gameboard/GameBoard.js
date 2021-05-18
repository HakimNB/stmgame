import React from 'react';
import {
  // Button,
  View,
  // Text,
  StyleSheet,
  // Alert,
} from 'react-native';

import Config from 'react-native-config';


// import {useSelector, useDispatch} from 'react-redux';

// import {
//   Action,
// } from '@/modules';

import Card from '@/components/card/Card';

import GameUtil from '@/modules/utils/gameUtil';

import style from './style';

// const COL = parseInt(Config.COL_COUNT);
// const ROW = parseInt(Config.ROW_COUNT);
// const MIN = parseInt(Config.NUM_MIN);
// const MAX = parseInt(Config.NUM_MAX);

const GameBoard = (props) => {
  const {row, col, boardWidth, boardHeight, boardNumbers, boardSteps, stateArray, gameState, resetPair, toggleCard} = props;

  // const dispatch = useDispatch();
  // const boardNumbers = useSelector((state) => state.game.boardNumbers);
  // // if ( !boardNumbers || boardNumbers.length == 0 ) {
  // //   dispatch(Action.game.generateBoard(ROW, COL, MIN, MAX));
  // // }
  // const boardSteps = useSelector((state) => state.game.boardSteps);
  // const stateArray = useSelector((state) => state.game.boardOpenStates);
  // const gameState = useSelector((state) => state.game.gameState);

  var rowAndColArr = GameUtil.splitToRowAndCol(boardNumbers, row, col);

  console.log("stateArray: ", stateArray);

  const [firstIndex, setFirstIndex] = React.useState(-1);
  const [secondIndex, setSecondIndex] = React.useState(-1);
  const [closeTimer, setCloseTimer] = React.useState(null);

  React.useEffect(() => {
    return () => {
      clearTimeout(closeTimer);
    };
  }, [closeTimer]);

  const closePair = React.useCallback(() => {
    console.log("closingPair firstIndex: " + firstIndex + " secondIndex: " + secondIndex);
    // dispatch(Action.game.setPairState(firstIndex, secondIndex, false));
    resetPair(firstIndex, secondIndex);
    setCloseTimer(null);
    setFirstIndex(-1);
    setSecondIndex(-1);
  }, [resetPair, firstIndex, secondIndex]);

  console.log("firstIndex: " + firstIndex + " secondIndex: " + secondIndex);

  React.useEffect(() => {
    if ( firstIndex >= 0 && secondIndex >= 0 ) {
      const firstVal = boardNumbers[firstIndex];
      const secondVal = boardNumbers[secondIndex];
      console.log("checking firstVal: " + firstVal + " secondVal: " + secondVal);
      if ( firstVal != secondVal ) {
        if ( closeTimer == null ) {
          // schedule close
          console.log("schedule close pair");
          const timer = setTimeout(closePair, 1000);
          setCloseTimer(timer);
        }
      } else {
        // pair matched!
        clearTimeout(closeTimer);
        setCloseTimer(null);
        setFirstIndex(-1);
        setSecondIndex(-1);
      }
    }
  }, [firstIndex, secondIndex, boardNumbers, closeTimer, closePair]);


  const [renderingAlert, setRenderingAlert] = React.useState(false);
  React.useEffect(() => {
    if ( gameState === GameUtil.GameState.ENDED && !renderingAlert ) {
      setRenderingAlert(true);
    };
    if ( gameState === GameUtil.GameState.PLAYING && renderingAlert ) {
      setRenderingAlert(false);
    }
    if ( gameState === GameUtil.GameState.RANDOMIZING ) {
      setFirstIndex(-1);
      setSecondIndex(-1);
      setCloseTimer(null);
      setRenderingAlert(false);
    }
  }, [boardSteps, gameState, renderingAlert]);

  const onClickCard = React.useCallback((cardKey) => {
    console.log("onClickCard: " + cardKey + " firstIndex: " + firstIndex + " secondIndex: " + secondIndex + " stateArray[" + cardKey + "]: " + stateArray[cardKey]);
    if ( stateArray[cardKey] || cardKey == firstIndex || cardKey == secondIndex || closeTimer != null ) {
      // cards are opened
      console.log(cardKey + " isOpened! returning...");
      return;
    }
    const isFirst = firstIndex < 0;
    const canOpen = secondIndex < 0;
    if (isFirst) {
      console.log("setting firstIndex to: " + cardKey);
      setFirstIndex(cardKey);
    } else {
      console.log("setting secondIndex to: " + cardKey);
      setSecondIndex(cardKey);
    }
    if ( canOpen ) {
      // dispatch(Action.game.setCardState(cardKey, !stateArray[cardKey]));
      toggleCard(cardKey);
    }
    }, [stateArray, firstIndex, secondIndex, closeTimer],
  );

  // const onClickRestart = React.useCallback(() => {
  //   setFirstIndex(-1);
  //   setSecondIndex(-1);
  //   setCloseTimer(null);
  //   setRenderingAlert(false);
  //   dispatch(Action.game.generateBoard(ROW, COL, MIN, MAX));
  // }, [dispatch]);

  const cardWidth = boardWidth / col;
  const cardHeight = boardHeight / row;

  return (
    <View style={style.board}>
      {rowAndColArr.map((rowArr, index) => {
        return (
          <View key={index} style={style.row}>
            {rowArr.map((el, idx) => {
              return (
                <Card key={index * col + idx} cardKey={index*col+idx} cardValue={el} cardWidth={cardWidth} cardHeight={cardHeight} isOpen={stateArray[index*col+idx]} onClick={onClickCard}
                />
              );
            })}
          </View>
        )
      })}
      </View>);
};

// const style = StyleSheet.create({
//   board: {
//     backgroundColor: 'skyblue',
//     flexDirection: 'column',
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'flex-end',
//   },
//   titleContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
// });

export default GameBoard;
