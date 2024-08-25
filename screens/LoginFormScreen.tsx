import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputFeild from '../components/InputFeild';
import {Picker} from '@react-native-picker/picker';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';

export default function LoginFormScreen({navigation}: any): React.JSX.Element {
  const [formValid, setFormValid] = useState(false);
  const {colors} = useTheme();

  const [inputvalues, setInputValues] = useState({
    fullName: {
      value: '',
      isValid: false,
    },
    gender: {
      value: '',
      isValid: false,
    },
    PhoneNumber: {
      value: '',
      isValid: false,
    },
    selectedAge: {
      value: '',
      isValid: false,
    },
  });
  function inputChangedHandler(inputIdentifier: string, enteredValue: string) {
    setInputValues(currentInputValues => {
      return {
        ...currentInputValues,
        [inputIdentifier]: {value: enteredValue, isValid: true},
      };
    });
  }

  useEffect(() => {
    const phoneNumberIsValid = inputvalues.PhoneNumber.value.length < 11;
    const fullNameIsValid = inputvalues.fullName.value.length < 3;
    const ageIsValid = inputvalues.selectedAge.value === '';
    const genderIsValid = inputvalues.gender.value === '';

    if (
      !phoneNumberIsValid ||
      !fullNameIsValid ||
      !ageIsValid ||
      !genderIsValid
    ) {
      setInputValues(currentInputs => {
        return {
          fullName: {
            value: currentInputs.fullName.value,
            isValid: fullNameIsValid,
          },
          PhoneNumber: {
            value: currentInputs.PhoneNumber.value,
            isValid: phoneNumberIsValid,
          },
          selectedAge: {
            value: currentInputs.selectedAge.value,
            isValid: ageIsValid,
          },
          gender: {
            value: currentInputs.gender.value,
            isValid: genderIsValid,
          },
        };
      });
    }
    if (
      !phoneNumberIsValid &&
      !fullNameIsValid &&
      !ageIsValid &&
      !genderIsValid
    ) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [
    inputvalues.PhoneNumber.value,
    inputvalues.selectedAge.value,
    inputvalues.fullName.value,
    inputvalues.gender.value,
  ]);

  console.log(inputvalues);
  return (
    <View style={styles.containerView}>
      <View style={styles.titlesContainer}>
        <Text style={[styles.titleText, {color: colors.text}]}>
          We Say Hello!
        </Text>
        <Text style={[styles.descriptionText, {color: colors.text}]}>
          Please enter your Data to be able to see the News
        </Text>
      </View>
      <InputFeild
        label="Full name"
        invalid={inputvalues.fullName.isValid}
        textInputConfig={{}}
        onChangeText={inputChangedHandler.bind(this, 'fullName')}
      />
      {inputvalues.fullName.isValid && (
        <Text style={styles.errorLabel}>
          you should enter valid name above 3 char
        </Text>
      )}
      <InputFeild
        label="Phone number"
        invalid={inputvalues.PhoneNumber.isValid}
        textInputConfig={{
          keyboardType: 'decimal-pad',
          maxLength: 11,
        }}
        onChangeText={inputChangedHandler.bind(this, 'PhoneNumber')}
      />
      {inputvalues.PhoneNumber.isValid && (
        <Text style={styles.errorLabel}>
          you should enter valid phone above 11 digit
        </Text>
      )}
      <View style={styles.pickerContainer}>
        <View
          style={[
            styles.picker1Container,
            inputvalues.selectedAge.isValid && styles.invalidInput,
          ]}>
          <Picker
            selectedValue={inputvalues.selectedAge.value}
            onValueChange={itemValue => {
              inputChangedHandler('selectedAge', itemValue);
            }}
            style={styles.picker}>
            <Picker.Item label="Select Age" value="" />
            {[...Array(83)].map((_, i) => (
              <Picker.Item key={i} label={`${i + 18}`} value={`${i + 18}`} />
            ))}
          </Picker>
        </View>
        <View
          style={[
            styles.picker1Container,
            inputvalues.gender.isValid && styles.invalidInput,
          ]}>
          <Picker
            selectedValue={inputvalues.gender.value}
            style={styles.picker}
            onValueChange={itemValue => {
              inputChangedHandler('gender', itemValue);
            }}>
            <Picker.Item label="Select Gender" value={undefined} />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Female" value="female" />
          </Picker>
        </View>
      </View>
      {(inputvalues.selectedAge.isValid || inputvalues.gender.isValid) && (
        <Text style={styles.errorLabel}>you should enter age and gender</Text>
      )}
      <CustomButton
        disabled={!formValid}
        title="login"
        onPress={async () => {
          const fullName = inputvalues.fullName.value;
          const phoneNumber = inputvalues.PhoneNumber.value;
          const age = inputvalues.selectedAge.value;
          const gender = inputvalues.gender.value;
          await AsyncStorage.setItem(
            'userInfo',
            JSON.stringify({fullName, phoneNumber, age, gender}),
          );

          navigation.reset({
            index: 0,
            routes: [{name: 'MainOverview'}],
          });
        }}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  containerView: {
    flex: 1,
  },
  titlesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  titleText: {
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
  },
  descriptionText: {
    marginHorizontal: 45,
    textAlign: 'center',
    marginVertical: 12,
    marginBottom: 24,
  },
  picker1Container: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderRadius: 8,
    margin: 10,
    alignContent: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  picker: {
    height: 45,
  },
  pickerContainer: {
    flexDirection: 'row',
  },
  button: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  invalidInput: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorLabel: {
    fontSize: 11,
    color: 'red',
    marginHorizontal: 15,
  },
});
