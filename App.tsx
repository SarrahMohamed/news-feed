import {StatusBar} from 'react-native';
import React from 'react';
import NavigationComponant from './components/NavigationComponants';

export default function App(): React.JSX.Element {
  return (
    <>
      <StatusBar />
      <NavigationComponant />
    </>
  );
}
