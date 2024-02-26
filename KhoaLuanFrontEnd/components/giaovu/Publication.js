import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Publication = () => {
  const handlePublish = () => {
    console.log('Xuất bản điểm tổng hợp');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handlePublish}>
        <Text style={styles.buttonText}>Xuất bản điểm tổng hợp</Text>
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

export default Publication;
