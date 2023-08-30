import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/Screens/LoginScreen';
import React from 'react';
import Profile from './src/Screens/Profile';

export default function App() {
  return (
    //<View style={styles.container}>
      <Profile></Profile>
    //</View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
