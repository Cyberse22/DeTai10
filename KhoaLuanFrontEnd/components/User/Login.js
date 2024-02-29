import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import API, { authAPI, endpoints } from '../../configs/API';
import MyContext from '../../configs/MyContext';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, dispatch] = useContext(MyContext)

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
      await AsyncStorage.setItem('refesh_token', res.data.refresh_token);
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
      console.log(user.data.role)
      console.log(res.data.access_token)
    } catch (ex) {
      // if (ex.response.status === 400) {
      //   alert('Sai tài khoản hoặc mật khẩu');
      // } else {
        console.error(ex);
        alert('Lỗi hệ thống');
      //}
    } finally {
      setLoading(false);
    }
  };

  return (
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
        <TouchableOpacity onPress={() => alert('Liên hệ Giáo Vụ Khoa để đổi mật khẩu')} style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </TouchableOpacity>
      </View>
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
