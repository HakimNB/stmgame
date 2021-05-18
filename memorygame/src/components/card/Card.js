import React from 'react';
import {View, Text, TouchableOpacity, Animated} from 'react-native';

import styles from './style';

const Card = (props) => {
  const {cardKey, cardValue, cardWidth, cardHeight, isOpen, onClick} = props;
  const animatedValue = React.useRef(new Animated.Value(0));
  const backInterpolate = animatedValue.current.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });
  const backAnimatedStyle = {
    transform: [
      {
        rotateY: backInterpolate,
      },
    ],
  };

  const [flipState, setFlipState] = React.useState(0);
  React.useEffect(() => {
    const curRef = animatedValue.current;
    curRef.addListener(({value}) => {
      setFlipState(value);
    });
    return () => {
      curRef.removeAllListeners();
    };
  }, []);

  // const flipCard = () => {
  //   if ( flipState >= 90 ) {
  //     Animated.timing(animatedValue.current, {
  //       useNativeDriver: true,
  //       toValue: 0,
  //       duration: 800,
  //     }).start();
  //     if ( onFlipOpen ) {
  //       onFlipOpen(flipCard);
  //     }
  //   } else {
  //     Animated.timing(animatedValue.current, {
  //       useNativeDriver: true,
  //       toValue: 180,
  //       duration: 800,
  //     }).start();
  //     if ( onFlipClose ) {
  //       onFlipClose(flipCard);
  //     }
  //   }
  // }

  const openCard = () => {
    Animated.timing(animatedValue.current, {
      useNativeDriver: true,
      toValue: 180,
      duration: 800,
    }).start();
  };

  const closeCard = () => {
    Animated.timing(animatedValue.current, {
      useNativeDriver: true,
      toValue: 0,
      duration: 800,
    }).start();
  };

  // console.log("Card : " + cardKey + " isOpen: " + isOpen + " flipState: " + flipState);

  if (isOpen) {
    if (flipState == 0) {
      openCard();
    }
  } else {
    if (flipState == 180) {
      closeCard();
    }
  }

  // original flipState == 0 : back
  // flipped flipState == 180 : front (show value)
  const extraStyle =
    flipState >= 90 ? styles.cardStyleFront : styles.cardStyleBack;
  const textStyle =
    flipState >= 90
      ? [styles.textBaseFront]
      : [styles.textBaseBack, styles.textStyleBack];

  return (
    <TouchableOpacity onPress={() => onClick(cardKey)}>
      <View
        style={(styles.containerStyle, {width: cardWidth, height: cardHeight})}>
        <Animated.View
          style={[
            backAnimatedStyle,
            styles.flipCardCombined,
            extraStyle,
            {width: cardWidth - 10, height: cardHeight - 10},
          ]}>
          <Text style={[...textStyle]}>
            {/*cardValue*/ flipState >= 90 ? cardValue : '??'}
          </Text>
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;
