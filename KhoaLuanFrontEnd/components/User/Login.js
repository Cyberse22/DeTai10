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
        'client_id': 'P2irBR0EJ3bguVmM6BDa874ZbzPirEmqDuKqNBnF',
        'client_secret': 'cVm4w4hSdy4MtwbP4KuNgXkGPeQJ9yrQdBvXHGR6b3e97F2bYqQ81XJ49FEufzjcw4SKwpuOZQiCLsNelHY1MkuYTGBRcSqtWmSlebSUk27WfyDskCB2VeCQihnEKdZ2',
        'grant_type': 'password'
      });
      await AsyncStorage.setItem('access_token', res.data.access_token);
      let user = await authAPI(res.data.access_token).get(endpoints['currentUser']);
      dispatch({
        type: 'login',
        payload: user.data
      });
      navigation.navigate('StudentHome');
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
