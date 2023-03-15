import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

//Takes time in min and => miliseconds
const minutesToMillis = (min) => min * 1000 * 60;
//Takes in the time left and if < 10; appends it with a "0"
const formatTime = (time) => (time < 10 ? `0${time}` : time);

//useRef so it doesn't cause a re-render like useState
//if value of variable changes, it won't cause a re-render

//set ms as callback to ensure the time is always the previously set amount

//if timer isPaused, it will track the current value if given any

//Every 1000ms or 1s, set the coundown
//if screen closed, interval is cleared to clear the memory

export const Countdown = ({ minutes = 0.1, isPaused, onProgress, onEnd }) => {

  const interval = React.useRef(null);

  const [millis, setMillis] = useState(null);

  const reset = () => setMillis(minutesToMillis(millis))

  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        clearInterval(interval.current);
        onEnd(reset);
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    });
  };

  useEffect(() => {
    setMillis(minutesToMillis(minutes));
  }, [minutes]);

  useEffect(() => {
    onProgress(millis / minutesToMillis(minutes));
  }, [millis]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }

    interval.current = setInterval(countDown, 1000);

    return () => clearInterval(interval.current);
  }, [isPaused]);

  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;

  return (
    <>
      <View>
        <Text style={styles.text}>
          {formatTime(minute)}:{formatTime(seconds)}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
    padding: spacing.lg,
    backgroundColor: 'rgba(94, 132, 226, 0.3)',
    borderRadius: 20,
  },
});
