import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SetUp = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // You can change the background color if needed
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default SetUp;