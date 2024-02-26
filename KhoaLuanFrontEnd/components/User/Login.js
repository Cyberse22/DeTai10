import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useReducer, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API, { authAPI, endpoints } from '../../configs/API';

const AppContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const LoginScreen = ({ navigation }) => {
  const [state, dispatch] = useReducer(reducer, { user: null });

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);

    try {
      let res = await API.post(endpoints['login'], {
        'username': username,
        'password': password,
        'client_id': '241CnQ7mNkCafYma02PmR9b6fmFsoLR0IchRI91n',
        'client_secret': 'HWtHDL1jxgomoK9o3WEwZgMI7CNu4rTrH0KLSanw7G3tGpY1qXpKtDol09vpf3ACyIqBq2pleqQRbN5pdCTiCnmywoQL8nKMBap3ZQARg6HP9A7xMmNY77zeujdz7hbu',
        'grant_type': 'password'
      });
      await AsyncStorage.setItem('access_token', res.data.access_token);
      let user = await authAPI(res.data.access_token).get(endpoints['currentUser']);
      dispatch({
        type: 'login',
        payload: user.data
      });
      switch (user.data.role) {
        case 'Student':
          navigation.navigate('StudentHome');
          break;
        case 'Dean':
          navigation.navigate('DeanHome');
          break;
        case 'Lecturer':
          navigation.navigate('LectureHome');
          break;
        default:
          break;
      }
    } catch (ex) {
      console.error(ex);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Tên đăng nhập"
        />
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          placeholder="Mật khẩu"
          secureTextEntry={true}
        />
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            <TouchableOpacity onPress={login} style={styles.button}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity onPress={() => alert('Quên mật khẩu?')} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#007bff',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;
