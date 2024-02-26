import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ThesisDean = ({ route }) => {
  const { thesis } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{thesis.title}</Text>
      <Text style={styles.status}>Trạng thái: {thesis.status}</Text>
      {/* Thêm các thông tin chi tiết khác của khóa luận ở đây */}
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
  status: {
    fontSize: 16,
    marginBottom: 5,
    color: '#3498db',
  },
});

export default ThesisDean;
