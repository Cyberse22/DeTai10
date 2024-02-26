import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CriteriaSetting = () => {
  const handleSetCriteria = () => {
    console.log('Thiết lập tiêu chí chấm điểm');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleSetCriteria}>
        <Text style={styles.buttonText}>Thiết lập tiêu chí chấm điểm</Text>
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

export default CriteriaSetting;
