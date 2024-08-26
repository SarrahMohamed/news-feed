import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/Settings';
import React from 'react';
import NewsListScreen from '../screens/NewsListcreen';
import {useTranslation} from 'react-i18next';
type BottomTabProps = {
  darkMode: boolean;
  toggleTheme: () => void;
};
export default function BottomTabNavigator({
  darkMode,
  toggleTheme,
}: BottomTabProps) {
  const {t} = useTranslation();

  const BottomTabs = createBottomTabNavigator();

  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="NewsListScreen"
        component={NewsListScreen}
        options={{title: `${t('NewsListScreen')}`}}
      />
      <BottomTabs.Screen
        name="SettingsScreen"
        options={{title: `${t('SettingsScreen')}`}}>
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
