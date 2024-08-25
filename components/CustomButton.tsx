import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import {Colors} from '../constant/Colors';
type CustomButtonProps = {
  onPress: () => void;
  title: string;
  disabled: boolean;
};

const CustomButton = ({
  onPress,
  title,
  disabled = false,
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled ? styles.buttonDisabled : styles.buttonEnabled,
      ]}
      onPress={onPress}
      disabled={disabled}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    marginTop: 40,
  },
  buttonEnabled: {
    backgroundColor: Colors.secondary,
  },
  buttonDisabled: {
    backgroundColor: '#A9A9A9',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
