import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, Button, Image, StyleSheet, View } from 'react-native';
import Context from '../../configs/MyContext';

const ProfileScreen = ({ preview = false, userId, userDataParam, route}) => {
  const { setAuthenticaticated, accessToken, setUserData, userData, role} = useContext(Context)
  const [userDataRender, setUserDataRender] = useState();

  useEffect(() => {
    if (!preview) {
      setUserDataRender(userData);
    } else {
      setUserDataRender(userDataParam);
    }
  }, [accessToken, route.params])

  const handleLogout = async () => {
    await AsyncStorage.removeItem('access_token');
    await AsyncStorage.removeItem('refesh_token');
    setAuthenticaticated(false);
  }

  return (
    <>
    {userDataRender ? <View style={styles.container}>
      <View style={styles.avatar}>
        <Image source={{ uri: userDataRender['avatar']}}/>
      </View>
      <View style={styles.userInfo}>{userDataRender['last_name']}</View>
      <View style={styles.userInfo}>{userDataRender['first_name']}</View>
      <View style={styles.userInfo}>{userDataRender['email']}</View>
      <View style={styles.userInfo}>{userDataRender['role']}</View>
      {!preview && role != 'Student' ? <Button title='Logout' style={{}} onPress={handleLogout}/> : null}
    </View>: <ActivityIndicator/>}
    </>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  userInfo: {
    alignItems: 'center',
  },
  field: {
    marginBottom: 10,
  },
});

export default ProfileScreen;
