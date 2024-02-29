import React, { useContext } from 'react'
import { Button } from 'react-native'
import MyContext from '../../configs/MyContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'

const Logout = () => {
  const [user, dispatch] = useContext(MyContext)
  const navigation = useNavigation()

  const logout = async () => {
    dispatch({
      type: 'logout',
    })

    await AsyncStorage.removeItem('access_token')
    await AsyncStorage.removeItem('refesh_token')
    navigation.navigate('Login')
  }

  return <Button title='Logout' onPress={logout} />
}

export default Logout
