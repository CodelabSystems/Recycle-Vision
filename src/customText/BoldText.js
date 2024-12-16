import React from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const BoldText = () => {
  return <Text style={[styles.text, style]} {...props} />;
};
const styles = StyleSheet.create({
  text: {
  },
});

export default BoldText;
