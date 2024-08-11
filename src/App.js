import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Initial from './Screens/Initial';
import Home from './Screens/Home';
import LoginScreen from './Screens/Login';
import RegisterScreen from './Screens/Register';
import Agendamentos from './Screens/ScheduleScreen';
import AgendamentosConcluidos from './Screens/ScheduleConclued';
import AgendamentosPendentes from './Screens/SchedulePending';
import { AuthProvider, useAuth } from './Screens/AuthContext';

const Tab = createBottomTabNavigator();

const AppContent = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName={user ? "Home" : "Initial"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Agendamentos':
              iconName = 'calendar';
              break;
            case 'Agendamentos Concluidos':
              iconName = 'check-circle';
              break;
            case 'Agendamentos Pendentes':
              iconName = 'hourglass-half';
              break;
            case 'Login':
              iconName = 'sign-in';
              break;
            case 'Register':
              iconName = 'user-plus';
              break;
            case 'Initial':
              iconName = 'info-circle';
              break;
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        headerStyle: {
          backgroundColor: 'black',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'left',
      })}
    >
      {user ? (
        <>
          <Tab.Screen name='Home' component={Home} />
          <Tab.Screen name='Agendamentos' component={Agendamentos} />
          <Tab.Screen name='Agendamentos Concluidos' component={AgendamentosConcluidos} />
          <Tab.Screen name='Agendamentos Pendentes' component={AgendamentosPendentes} />
        </>
      ) : (
        <>
          <Tab.Screen name="Initial" component={Initial} options={{ headerShown: false }} />
          <Tab.Screen name='Login' component={LoginScreen} />
          <Tab.Screen name='Register' component={RegisterScreen} />
        </>
      )}
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppContent />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
