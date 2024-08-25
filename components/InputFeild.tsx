import {View, Text, TextInput, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '../constant/Colors';

interface MyComponentProps {
  invalid: boolean;

  label: string;
  textInputConfig: any;
  onChangeText: any;
}
export default function InputFeild({
  invalid,
  label,
  textInputConfig,
  onChangeText,
}: MyComponentProps): React.JSX.Element {
  let inputStyles = [styles.input];

  return (
    <View style={[styles.inputContainer]}>
      <TextInput
        style={[inputStyles, invalid && styles.invalidInput]}
        placeholder={label}
        {...textInputConfig}
        onChangeText={onChangeText}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
    color: 'black',
  },
  input: {
    backgroundColor: Colors.gray95,
    padding: 6,
    borderRadius: 12,
    color: 'black',
    fontSize: 12,
    marginHorizontal: 10,
  },
  inputMultilines: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  invalidLabel: {
    color: 'red',
  },
  invalidInput: {
    // backgroundColor: 'red',
    borderColor: 'red',
    borderWidth: 1,
  },
});
