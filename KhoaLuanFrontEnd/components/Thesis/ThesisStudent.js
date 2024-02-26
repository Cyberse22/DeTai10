import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ThesisDetailScreen = ({ route }) => {
  const { thesisData } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{thesisData.title}</Text>
      <Text style={styles.label}>Người hướng dẫn:</Text>
      <Text style={styles.detail}>{thesisData.advisor}</Text>
      <Text style={styles.label}>Ngày bảo vệ:</Text>
      <Text style={styles.detail}>{thesisData.defenseDate}</Text>
      {/* Thêm các thông tin khác của khoá luận */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'left',
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  detail: {
    fontSize: 16,
    marginTop: 5,
  },
});

export default ThesisDetailScreen;
