import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import _TabsLayout from './screens/_layout';

// Criando o Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    // O NavigationContainer é necessário para envolver toda a navegação
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,  // Oculta o cabeçalho globalmente
        }}
      >
        {/* Definindo as telas dentro do Stack Navigator */}
        {/* Definindo as telas dentro do Stack Navigator  */}
        <Stack.Screen name="_TabsLayout" component={_TabsLayout} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

