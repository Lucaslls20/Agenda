import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Initial from './Screens/Initial';
import Home from './Screens/Home';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import Agendar from './Screens/ScheduleScreen';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Initial"
        screenOptions={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white', // Ajustado para contraste com o fundo escuro
          headerTitleAlign: 'left', // Alinha o título à esquerda
        }}
      >
        <Stack.Screen name="Initial" component={Initial} options={{ headerShown: false }} />
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Agendar' component={Agendar} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
