import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ThesisRecord = () => {
  const handleRecordThesis = () => {
    console.log('Ghi nhận khoá luận');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleRecordThesis}>
        <Text style={styles.buttonText}>Ghi nhận khoá luận</Text>
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

export default ThesisRecord;
