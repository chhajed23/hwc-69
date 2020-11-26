
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ScanScreen from './screens/scanScreen'

export default function App() {
  return (
    <View style={styles.container}>
      <ScanScreen/>
    </View>
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
