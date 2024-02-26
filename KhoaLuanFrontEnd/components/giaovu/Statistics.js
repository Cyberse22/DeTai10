import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Statistics = () => {
  const handleViewStatistics = () => {
    console.log('Xem thống kê điểm khoá luận');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleViewStatistics}>
        <Text style={styles.buttonText}>Xem thống kê điểm khoá luận</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'lightblue',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontWeight: 'bold',
  },
});

export default Statistics;
