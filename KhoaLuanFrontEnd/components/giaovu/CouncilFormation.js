import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CouncilFormation = () => {
  const handleFormCouncil = () => {
    console.log('Thành lập hội đồng bảo vệ');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleFormCouncil}>
        <Text style={styles.buttonText}>Thành lập hội đồng bảo vệ</Text>
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

export default CouncilFormation;
