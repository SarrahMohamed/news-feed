import React, {useState, useEffect} from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTheme} from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import {Picker} from '@react-native-picker/picker';
import {useTranslation} from 'react-i18next';

type SettingsScreenProps = {
  darkMode: boolean;
  toggleTheme: () => void;
  navigation: any;
};

export default function SettingsScreen({
  darkMode,
  toggleTheme,
  navigation,
}: SettingsScreenProps) {
  const {t, i18n} = useTranslation();

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
  };
  const {colors} = useTheme();
  console.log(colors);
  const [userInfo, setUserInfo] = useState<{
    fullName: string;
    phoneNumber: string;
    age: number;
    gender: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await AsyncStorage.getItem('userInfo');
      if (data) {
        setUserInfo(JSON.parse(data));
      }
    };
    fetchUserInfo();
  }, []);
  const textColorStyle = {color: colors.text, borderColor: colors.border};
  return (
    <View style={styles.container}>
      {userInfo && (
        <View style={styles.userInfo}>
          <Text style={[styles.userInfoText, textColorStyle]}>
            {t('full_name')}: {userInfo.fullName}
          </Text>
          <Text style={[styles.userInfoText, textColorStyle]}>
            {t('Phone_number')}: {userInfo.phoneNumber}
          </Text>
          <Text style={[styles.userInfoText, textColorStyle]}>
            {t('age')}: {userInfo.age}
          </Text>
          <Text style={[styles.userInfoText, textColorStyle]}>
            {t('gender')}: {userInfo.gender}
          </Text>
        </View>
      )}
      <View style={styles.themeToggle}>
        <Text style={[styles.toggleText, textColorStyle]}>Dark Mode</Text>
        <Switch value={darkMode} onValueChange={toggleTheme} />
      </View>
      <Picker
        selectedValue={i18n.language}
        style={[styles.picker, {color: colors.text}]}
        onValueChange={itemValue => changeLanguage(itemValue)}>
        <Picker.Item label="English" value="en" />
        <Picker.Item label="العربيه" value="ar" />
      </Picker>
      <CustomButton
        title={t('logout')}
        onPress={async () => {
          await AsyncStorage.clear(); // Clear all stored data in logout
          navigation.reset({
            index: 0,
            routes: [{name: 'LoginFormScreen'}],
          });
        }}
        disabled={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  userInfo: {
    marginBottom: 32,
  },
  userInfoText: {
    fontSize: 16,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    padding: 8,
  },
  themeToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleText: {
    fontSize: 18,
  },
  picker: {
    height: 50,
    width: 150,
  },
});
