import React from 'react';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Save() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Save Screen</Text>
    </View>
  );
}

export default Save;