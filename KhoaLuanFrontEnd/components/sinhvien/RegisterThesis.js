import React, { useContext, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import MyContext from '../../configs/MyContext'

const Register = () => {
  const [user, dispatch] = useContext(MyContext)

  const logout = () => {
    dispatch({
      type: 'logout',
    })
  }

  // Dữ liệu tĩnh về danh sách giảng viên hướng dẫn
  const instructors = [
    { id: 1, name: 'Dr. John Doe' },
    { id: 2, name: 'Dr. Jane Smith' },
    { id: 3, name: 'Dr. David Johnson' },
  ]

  const [thesisTitle, setThesisTitle] = useState('')
  const [selectedInstructor, setSelectedInstructor] = useState(null)
  const [description, setDescription] = useState('')

  const handleRegister = () => {
    // Xử lý đăng ký khoá luận
    alert('Chức năng đang được phát triển')
  }

  const handleCancel = () => {
    // Xử lý hủy đăng ký
    alert('Hủy đăng ký')
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Đăng ký khoá luận</Text>
      <TextInput
        style={styles.input}
        value={thesisTitle}
        onChangeText={setThesisTitle}
        placeholder='Nhập tên khoá luận'
      />
      <View style={styles.selectContainer}>
        <Text style={styles.label}>Chọn giảng viên hướng dẫn:</Text>
        <View style={styles.select}>
          {instructors.map((instructor) => (
            <TouchableOpacity
              key={instructor.id}
              style={[
                styles.selectOption,
                selectedInstructor &&
                  selectedInstructor.id === instructor.id &&
                  styles.selectedOption,
              ]}
              onPress={() => setSelectedInstructor(instructor)}
            >
              <Text>{instructor.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        placeholder='Nhập mô tả khoá luận'
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={handleRegister}
        >
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
        >
          <Text style={styles.buttonText}>Hủy</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  selectContainer: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 10,
  },
  select: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectOption: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
    color: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: '#007bff',
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})

export default Register
