import 'intl-pluralrules';

import React, {useEffect, useState} from 'react';

import {
  DefaultTheme,
  LinkingOptions,
  NavigationContainer,
  Theme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomTabNavigator from './BottomTabNavigator';
import LoginFormScreen from '../screens/LoginFormScreen';
import NewsDetailsScreen from '../screens/NewsDetailsScreen';
import {darkTheme} from '../constant/Colors';
import {Text} from 'react-native';
import {I18nextProvider} from 'react-i18next';
import i18n from '../language/i18n';

export default function NavigationComponant() {
  const Stack = createNativeStackNavigator();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme) {
        setDarkMode(JSON.parse(savedTheme));
      }
    };
    fetchTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    await AsyncStorage.setItem('darkMode', JSON.stringify(newTheme));
  };

  const theme: Theme = darkMode ? darkTheme : DefaultTheme;

  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        await AsyncStorage.setItem('hasLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    };

    checkFirstLaunch();
  }, []);

  if (isFirstLaunch === null) {
    return <Text>fisrt lunch</Text>;
  }

  const linking: LinkingOptions = {
    prefixes: ['voisNews://'],
    config: {
      screens: {
        MainOverview: 'news',
        DetailsScreen: 'news/details?itemID=:itemID',
      },
    },
  };
  return (
    <I18nextProvider i18n={i18n}>
      <NavigationContainer theme={theme} linking={linking}>
        <Stack.Navigator
          initialRouteName={isFirstLaunch ? 'LoginFormScreen' : 'MainOverview'}>
          <Stack.Screen
            name="LoginFormScreen"
            component={LoginFormScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen name="MainOverview" options={{headerShown: false}}>
            {props => (
              <BottomTabNavigator
                {...props}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="DetailsScreen" component={NewsDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </I18nextProvider>
  );
}
