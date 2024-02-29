import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { endpoints } from '../../configs/API';
import Logout from '../User/Logout';

const StudentHome = ({ navigation }) => {
  const [studentInfo, setStudentInfo] = useState(null);
  const [registeredThesis, setRegisteredThesis] = useState([]);

  useEffect(() =>{
    axios.get(endpoints.currentUser)
    .then(response => {
      setStudentInfo(response.data);
    })
    . catch(error => {
      console.error(error);
    });

    axios.get(endpoints.myThesis)
    .then(response => {
      setRegisteredThesis(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  }, []);

  const handleRegisterThesis = () => {
    alert('Chức năng đang được phát triển');
  };

  const handleViewThesisList = () => {
    alert('Chức năng đang được phát triển');
  };

  const handleChatWithInstructor = () => {
    alert('Chức năng đang được phát triển');
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin sinh viên</Text>
      <View style={styles.studentInfo}>
        <Text>Họ và tên: {studentInfo?.name}</Text>
        <Text>Mã sinh viên: {studentInfo?.studentId}</Text>
        <Text>Email: {studentInfo?.email}</Text>
        <Text>Vai trò: {studentInfo?.role}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleRegisterThesis}>
          <Text style={styles.buttonText}>Đăng ký khoá luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleViewThesisList}>
          <Text style={styles.buttonText}>Xem danh sách khoá luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChatWithInstructor}>
          <Text style={styles.buttonText}>Chat với giảng viên</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <Logout navigation={navigation} />
      </View>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  studentInfo: {
    marginBottom: 20,
  },
  buttonContainer: {
    width: '80%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default StudentHome;
