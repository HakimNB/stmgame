import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Alert,
} from 'react-native';

import Config from 'react-native-config';


import {useSelector, useDispatch} from 'react-redux';

import {
  Action,
} from '@/modules';

import Card from '@/components/Card';

import GameUtil from '@/modules/utils/gameUtil';

const COL = parseInt(Config.COL_COUNT);
const ROW = parseInt(Config.ROW_COUNT);
const MIN = parseInt(Config.NUM_MIN);
const MAX = parseInt(Config.NUM_MAX);

const GameScreen = () => {
  const dispatch = useDispatch();
  const entireArray = useSelector((state) => state.game.boardNumbers);
  if ( !entireArray || entireArray.length == 0 ) {
    dispatch(Action.game.generateBoard(ROW, COL, MIN, MAX));
  }
  const boardSteps = useSelector((state) => state.game.boardSteps);
  const stateArray = useSelector((state) => state.game.boardOpenStates);
  const gameState = useSelector((state) => state.game.gameState);

  var rowAndColArr = GameUtil.splitToRowAndCol(entireArray, ROW, COL);

  console.log("stateArray: ", stateArray);

  const [firstIndex, setFirstIndex] = React.useState(-1);
  const [secondIndex, setSecondIndex] = React.useState(-1);
  const [closeTimer, setCloseTimer] = React.useState(null);

  const closePair = React.useCallback(() => {
    console.log("closingPair firstIndex: " + firstIndex + " secondIndex: " + secondIndex);
    dispatch(Action.game.setPairState(firstIndex, secondIndex, false));
    setCloseTimer(null);
    setFirstIndex(-1);
    setSecondIndex(-1);
  }, [dispatch, firstIndex, secondIndex]);

  console.log("firstIndex: " + firstIndex + " secondIndex: " + secondIndex);

  if ( firstIndex >= 0 && secondIndex >= 0 ) {
    const firstVal = entireArray[firstIndex];
    const secondVal = entireArray[secondIndex];
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

  const [renderingAlert, setRenderingAlert] = React.useState(false);
  if ( gameState === GameUtil.GameState.ENDED && !renderingAlert ) {
    setRenderingAlert(true);
    Alert.alert("Congratulations!", "You win this game by " + boardSteps + " steps!", [{text: "Try another round", onPress: () => {
      dispatch(Action.game.setGameState(GameUtil.GameState.RANDOMIZING));
      dispatch(Action.game.generateBoard(ROW, COL, MIN, MAX));
    }}]);
  }
  if ( gameState === GameUtil.GameState.PLAYING && renderingAlert ) {
    setRenderingAlert(false);
  }

  const onClickCard = React.useCallback((cardKey) => {
    console.log("onClickCard: " + cardKey + " firstIndex: " + firstIndex + " secondIndex: " + secondIndex);
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
      dispatch(Action.game.setCardState(cardKey, !stateArray[cardKey]));
    }
    }, [dispatch, stateArray, firstIndex, secondIndex, closeTimer],
  );

  return (
    <View style={style.board}>
      {
        gameState !== GameUtil.GameState.RANDOMIZING ? (<View>
        <Text>{"Steps: " + boardSteps}</Text>
      {rowAndColArr.map((rowArr, index) => {
        return (
          <View key={index} style={style.row}>
            {rowArr.map((el, idx) => {
              return (
                <Card key={index * COL + idx} cardKey={index*COL+idx} cardValue={el} isOpen={stateArray[index*COL+idx]} onClick={onClickCard}
                />
              );
            })}
          </View>
        )
      })}
      </View>) : <View/>
      }
    </View>);
};

const style = StyleSheet.create({
  board: {
    backgroundColor: 'powderblue',
    flexDirection: 'column',
  },
  row: {
    backgroundColor: 'skyblue',
    flexDirection: 'row',
    justifyContent: 'center',
  }
});

export default GameScreen;
