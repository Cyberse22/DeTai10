import React from 'react';
import { Text, View } from 'react-native';

const ThesisDetails = ({ route }) => {
  const { thesisId, thesisData } = route.params;
  const selectedThesis = thesisData.find(thesis => thesis.id === thesisId);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedThesis.title}</Text>
      <Text style={styles.description}>{selectedThesis.description}</Text>
      <Text style={styles.label}>Advisors:</Text>
      {selectedThesis.advisors.map((advisor, index) => (
        <Text key={index} style={styles.item}>{advisor}</Text>
      ))}
      <Text style={styles.label}>Students:</Text>
      {selectedThesis.students.map((student, index) => (
        <Text key={index} style={styles.item}>{student}</Text>
      ))}
      <Text style={styles.status}>
        Status: {selectedThesis.is_active ? 'Active' : 'Inactive'}
      </Text>
      <Text style={styles.status}>
        Defend: {selectedThesis.is_defend ? 'Yes' : 'No'}
      </Text>
    </View>
  );
};

const styles = {
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
};

export default ThesisDetails;