import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import BluePage from './bluePage';
import GreenPage from './GreenPage';
import YellowPage from './YellowPage';
import OrangePage from './OrangePage';
import RedPage from './RedPage';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="BluePage">
        <Stack.Screen name="BluePage" component={BluePage} />
        <Stack.Screen name="GreenPage" component={GreenPage} />
        <Stack.Screen name="YellowPage" component={YellowPage} />
        <Stack.Screen name="OrangePage" component={OrangePage} />
        <Stack.Screen name="RedPage" component={RedPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
