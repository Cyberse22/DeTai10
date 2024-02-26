import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import LoginScreen from './components/User/Login';
import LecturerHome from './components/giaovien/Home';
import ScoreScreen from './components/giaovien/Score';
import CouncilFormation from './components/giaovu/CouncilFormation';
import CouncilLock from './components/giaovu/CouncilLock';
import CriteriaSetting from './components/giaovu/CriteriaSetting';
import DeanHome from './components/giaovu/Home';
import Publication from './components/giaovu/Publication';
import ReviewerAssignment from './components/giaovu/ReviewAssignment';
import Statistics from './components/giaovu/Statistics';
import ThesisRecord from './components/giaovu/ThesisRecord';
import Chat from './components/sinhvien/Chat';
import StudentHome from './components/sinhvien/Home';


const Stack = createStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem('access-token');
      const role = await AsyncStorage.getItem('user-role');
      if (token && role) {
        setIsLoggedIn(true);
        setUserRole(role);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          userRole === 'student' ? (
            <>
              <Stack.Screen name="StudentHome" component={StudentHome} />
              <Stack.Screen name="Chat" component={Chat} />
            </>
          ) : userRole === 'lecturer' ? (
            <>
              <Stack.Screen name="LecturerHome" component={LecturerHome} />
              <Stack.Screen name="Score" component={ScoreScreen} />
              <Stack.Screen name="Chat" component={Chat} />
            </>
          ) : userRole === 'dean' ? (
            <>
              <Stack.Screen name="DeanHome" component={DeanHome} />
              <Stack.Screen name="ThesisRecord" component={ThesisRecord} />
              <Stack.Screen name="ReviewerAssignment" component={ReviewerAssignment} />
              <Stack.Screen name="CouncilFormation" component={CouncilFormation} />
              <Stack.Screen name="CouncilLock" component={CouncilLock} />
              <Stack.Screen name="CriteriaSetting" component={CriteriaSetting} />
              <Stack.Screen name="Statistics" component={Statistics} />
              <Stack.Screen name="Publication" component={Publication} />
            </>
          ) : null
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
