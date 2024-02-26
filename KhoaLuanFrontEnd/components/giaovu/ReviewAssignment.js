import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ReviewerAssignment = () => {
  const handleAssignReviewer = () => {
    console.log('Phân công giảng viên phản biện');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleAssignReviewer}>
        <Text style={styles.buttonText}>Phân công giảng viên phản biện</Text>
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

export default ReviewerAssignment;
