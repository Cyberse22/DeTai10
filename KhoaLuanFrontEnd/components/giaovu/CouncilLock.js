import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const CouncilLock = () => {
  const handleLockCouncil = () => {
    console.log('Khoá hội đồng');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleLockCouncil}>
        <Text style={styles.buttonText}>Khoá hội đồng</Text>
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

export default CouncilLock;
