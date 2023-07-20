import React from 'react';
import { View, Text } from 'react-native';
import MainScreen from './MainScreen';

const Subparts = ({ selectedSubparts }) => {
  return (
    <View>
      <MainScreen selectedSubparts={selectedSubparts}/>
    </View>
  );
};

export default Subparts;
