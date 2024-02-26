import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const DeanHome = () => {
  // Dữ liệu tĩnh mô phỏng thông tin của giáo vụ khoa và các khoá luận trong hệ thống
  const deanInfo = {
    name: 'Nguyễn Thị B',
    email: 'nguyenthic@example.com',
    role: 'Giáo vụ khoa',
  };

  const theses = [
    { id: 1, title: 'Khoá luận A', status: 'Chưa ghi nhận' },
    { id: 2, title: 'Khoá luận B', status: 'Đã ghi nhận' },
    { id: 3, title: 'Khoá luận C', status: 'Chưa ghi nhận' },
  ];

  const handleManageUsers = () => {
    // Xử lý chức năng quản lý người dùng
    console.log('Quản lý người dùng');
  };

  const handleRecordThesis = () => {
    // Xử lý chức năng ghi nhận khoá luận
    console.log('Ghi nhận khoá luận');
  };

  const handleAssignOpponent = () => {
    // Xử lý chức năng phân công giảng viên phản biện
    console.log('Phân công giảng viên phản biện');
  };

  const handleEstablishCouncil = () => {
    // Xử lý chức năng thành lập hội đồng bảo vệ
    console.log('Thành lập hội đồng bảo vệ');
  };

  const handleLockCouncil = () => {
    // Xử lý chức năng khoá hội đồng
    console.log('Khoá hội đồng');
  };

  const handleSetCriteria = () => {
    // Xử lý chức năng thiết lập tiêu chí chấm điểm
    console.log('Thiết lập tiêu chí chấm điểm');
  };

  const handleViewScores = () => {
    // Xử lý chức năng xem thống kê điểm khoá luận
    console.log('Xem thống kê điểm khoá luận');
  };

  const handlePublishScores = () => {
    // Xử lý chức năng xuất bản điểm tổng hợp
    console.log('Xuất bản điểm tổng hợp');
  };

  const handleLogout = () => {
    // Xử lý chức năng đăng xuất
    console.log('Đăng xuất');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin giáo vụ khoa</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Họ và tên:</Text>
        <Text>{deanInfo.name}</Text>
        <Text style={styles.label}>Email:</Text>
        <Text>{deanInfo.email}</Text>
        <Text style={styles.label}>Vai trò:</Text>
        <Text>{deanInfo.role}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleManageUsers}>
          <Text style={styles.buttonText}>Quản lý người dùng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRecordThesis}>
          <Text style={styles.buttonText}>Ghi nhận khoá luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleAssignOpponent}>
          <Text style={styles.buttonText}>Phân công giảng viên phản biện</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleEstablishCouncil}>
          <Text style={styles.buttonText}>Thành lập hội đồng bảo vệ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLockCouncil}>
          <Text style={styles.buttonText}>Khoá hội đồng</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleSetCriteria}>
          <Text style={styles.buttonText}>Thiết lập tiêu chí chấm điểm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleViewScores}>
          <Text style={styles.buttonText}>Xem thống kê điểm khoá luận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handlePublishScores}>
          <Text style={styles.buttonText}>Xuất bản điểm tổng hợp</Text>
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
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default DeanHome;
