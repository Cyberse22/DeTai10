import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React, { useEffect, useReducer, useState } from 'react'
import LoginScreen from './components/User/Login'
import ProfileScreen from './components/User/Profile'
import LecturerHome from './components/giaovien/LectureHome'
import ScoreScreen from './components/giaovien/Score'
import CouncilFormation from './components/giaovu/CouncilFormation'
import CouncilLock from './components/giaovu/CouncilLock'
import CriteriaSetting from './components/giaovu/CriteriaSetting'
import DeanHome from './components/giaovu/DeanHome'
import Publication from './components/giaovu/Publication'
import ReviewerAssignment from './components/giaovu/ReviewAssignment'
import Statistics from './components/giaovu/Statistics'
import ThesisRecord from './components/giaovu/ThesisRecord'
import Chat from './components/sinhvien/Chat'
import StudentHome from './components/sinhvien/StudentHome'
import MyContext from './configs/MyContext'
import MyUserReducer from './reducers/MyUserReducer'

const Stack = createStackNavigator()

const App = () => {
  const [user, dispatch] = useReducer(MyUserReducer, null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    if (user) {
      setUserRole(user.role)
      setIsLoggedIn(true)
    }
  }, [user])

  const MainStackNavigator = () => {
    return (
      <Stack.Navigator options={{ headerShown: false }}>
        {userRole === 'Student' ? (
          <>
            <Stack.Screen name='StudentHome' component={StudentHome} />
            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </>
        ) : userRole === 'Lecture' ? (
          <>
            <Stack.Screen name='LectureHome' component={LecturerHome} />
            <Stack.Screen name='Score' component={ScoreScreen} />
            <Stack.Screen name='Chat' component={Chat} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </>
        ) : userRole === 'Dean' ? (
          <>
            <Stack.Screen name='DeanHome' component={DeanHome} />
            <Stack.Screen name='ThesisRecord' component={ThesisRecord} />
            <Stack.Screen
              name='ReviewerAssignment'
              component={ReviewerAssignment}
            />
            <Stack.Screen
              name='CouncilFormation'
              component={CouncilFormation}
            />
            <Stack.Screen name='CouncilLock' component={CouncilLock} />
            <Stack.Screen name='CriteriaSetting' component={CriteriaSetting} />
            <Stack.Screen name='Statistics' component={Statistics} />
            <Stack.Screen name='Publication' component={Publication} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </>
        ) : (
          <></>
        )}
      </Stack.Navigator>
    )
  }

  return (
    <MyContext.Provider value={[user, dispatch]}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen
            name='Main'
            component={MainStackNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyContext.Provider>
  )
}

export default App
