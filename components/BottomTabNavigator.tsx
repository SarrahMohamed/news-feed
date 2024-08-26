import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SettingsScreen from '../screens/Settings';
import React from 'react';
import NewsListScreen from '../screens/NewsListcreen';
import {useTranslation} from 'react-i18next';
import Icon from 'react-native-vector-icons/Ionicons';

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
        options={{
          title: `${t('NewsListScreen')}`,
          tabBarIcon: ({color, size}) => (
            <Icon name="newspaper" size={size} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="SettingsScreen"
        options={{
          title: `${t('SettingsScreen')}`,
          tabBarIcon: ({color, size}) => (
            <Icon name="settings" size={size} color={color} />
          ),
        }}>
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
