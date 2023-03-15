import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { spacing } from '../utils/sizes';
import { RoundedButton } from '../components/RoundedButton';

export const Focus = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  console.log(subject);

  // from "https://stackoverflow.com/questions/72262429/hide-keyboard-and-lose-focus-when-user-click-outside-the-react-native-paper-sear"

  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.container}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              label="What would you like to focus on?"
              onChangeText={setSubject}
            />
            <View style={styles.button}>
              <RoundedButton
                title="+"
                size={50}
                onPress={() => addSubject(subject)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  button: {
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
  },
  inputContainer: {
    // flex: 0.5,
    padding: spacing.lg,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});
