import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const LecturerHome = () => {
  // Dữ liệu tĩnh mô phỏng thông tin của giảng viên và các khoá luận mà giảng viên hướng dẫn, phản biện, hoặc là thành viên hội đồng
  const lecturerInfo = {
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    role: 'Giảng viên',
  };

  const theses = [
    { id: 1, title: 'Khoá luận A', role: 'Hướng dẫn' },
    { id: 2, title: 'Khoá luận B', role: 'Phản biện' },
    { id: 3, title: 'Khoá luận C', role: 'Thành viên hội đồng' },
  ];

  const handleViewTheses = () => {
    // Xử lý chức năng xem danh sách các khoá luận
    console.log('Xem danh sách khoá luận');
  };

  const handleGradeTheses = () => {
    // Xử lý chức năng chấm điểm khoá luận
    console.log('Chấm điểm khoá luận');
  };

  const handleChatWithStudent = () => {
    // Xử lý chức năng chat với sinh viên
    console.log('Chat với sinh viên');
  };

  const handleLogout = () => {
    // Xử lý chức năng đăng xuất
    console.log('Đăng xuất');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin giảng viên</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Họ và tên:</Text>
        <Text>{lecturerInfo.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text>{lecturerInfo.email}</Text>
        <Text style={styles.label}>Vai trò:</Text>
        <Text>{lecturerInfo.role}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleViewTheses}>
          <Text style={styles.buttonText}>Danh sách khoá luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleGradeTheses}>
          <Text style={styles.buttonText}>Chấm điểm khoá luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleChatWithStudent}>
          <Text style={styles.buttonText}>Chat với sinh viên</Text>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
});

export default LecturerHome;
