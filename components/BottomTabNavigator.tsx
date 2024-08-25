import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/Settings';
import React from 'react';
import NewsListScreen from '../screens/NewsListcreen';
type BottomTabProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};
export default function BottomTabNavigator({
  darkMode,
  toggleTheme,
}: BottomTabProps) {
  const BottomTabs = createBottomTabNavigator();

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen name="NewsListScreen" component={NewsListScreen} />
      <BottomTabs.Screen name="SettingsScreen">
        {props => (
          <SettingsScreen
            {...props}
            darkMode={darkMode}
            toggleTheme={toggleTheme}
          />
        )}
      </BottomTabs.Screen>
    </BottomTabs.Navigator>
  );
}
