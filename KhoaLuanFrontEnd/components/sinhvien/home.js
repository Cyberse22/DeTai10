import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const StudentHome = () => {
  const studentInfo = {
    name: 'Nguyễn Văn Sinh',
    studentId: '123456',
    email: 'sinhnguyen@example.com',
    major: 'Computer Science',
  };

  const registeredThesis = [
    { id: 1, title: 'Thesis 1', instructor: 'Dr. John Doe' },
    { id: 2, title: 'Thesis 2', instructor: 'Dr. Jane Smith' },
  ];

  const handleRegisterThesis = () => {
    alert('Chức năng đang được phát triển');
  };

  const handleViewThesisList = () => {
    alert('Chức năng đang được phát triển');
  };

  const handleChatWithInstructor = () => {
    alert('Chức năng đang được phát triển');
  };

  const handleLogout = () => {
    alert('Chức năng đăng xuất');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin sinh viên</Text>
      <View style={styles.studentInfo}>
        <Text>Họ và tên: {studentInfo.name}</Text>
        <Text>Mã sinh viên: {studentInfo.studentId}</Text>
        <Text>Email: {studentInfo.email}</Text>
        <Text>Ngành học: {studentInfo.major}</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Đăng xuất</Text>
        </TouchableOpacity>
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
