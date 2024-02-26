import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const ScoreScreen = () => {
  // Dữ liệu tĩnh mô phỏng các tiêu chí chấm điểm và trọng số
  const criteria = [
    { id: 1, name: 'Nội dung', weight: 0.3 },
    { id: 2, name: 'Phương pháp nghiên cứu', weight: 0.2 },
    { id: 3, name: 'Kết quả đạt được', weight: 0.3 },
    { id: 4, name: 'Bảo vệ và trình bày', weight: 0.2 },
  ];

  // State để lưu điểm số cho mỗi tiêu chí
  const [scores, setScores] = useState(new Array(criteria.length).fill(''));

  const handleScoreChange = (index, score) => {
    const newScores = [...scores];
    newScores[index] = score;
    setScores(newScores);
  };

  const handleSaveScore = () => {
    // Xử lý chức năng lưu điểm số
    console.log('Lưu điểm số:', scores);
  };

  const handleCancel = () => {
    // Xử lý chức năng hủy
    console.log('Hủy');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chấm điểm khoá luận</Text>
      <View style={styles.criteriaContainer}>
        {criteria.map((criterion, index) => (
          <View key={criterion.id} style={styles.criterionItem}>
            <Text>{criterion.name}</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={scores[index]}
              onChangeText={(score) => handleScoreChange(index, score)}
            />
            <Text style={styles.weightText}>Trọng số: {criterion.weight}</Text>
          </View>
        ))}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSaveScore}>
          <Text style={styles.buttonText}>Lưu</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
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
  criteriaContainer: {
    marginBottom: 20,
  },
  criterionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  weightText: {
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  saveButton: {
    backgroundColor: 'green',
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ScoreScreen;
