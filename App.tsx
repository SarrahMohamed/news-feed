/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useLayoutEffect, useState} from 'react';
import {StatusBar, StyleSheet, Text, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import LoginFormScreen from './screens/LoginFormScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import NewsListScreen from './screens/NewsListcreen';
import SettingsScreen from './screens/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewsDetailsScreen from './screens/NewsDetailsScreen';

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function MainOverView(): React.JSX.Element {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="NewsListScreen" component={NewsListScreen} />
      <BottomTabs.Screen name="SettingsScreen" component={SettingsScreen} />
    </BottomTabs.Navigator>
  );
}

function App(): React.JSX.Element {
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

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : 'white',
  };
  if (isFirstLaunch === null) {
    return <Text>ssss</Text>; // or a loading spinner
  }
  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={isFirstLaunch ? 'LoginFormScreen' : 'MainOverview'}>
          <Stack.Screen
            name="LoginFormScreen"
            component={LoginFormScreen}
            options={{headerShown: false}}
          />

          <Stack.Screen
            name="MainOverview"
            component={MainOverView}
            options={{headerShown: false}}
          />
          <Stack.Screen name="DetailsScreen" component={NewsDetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
