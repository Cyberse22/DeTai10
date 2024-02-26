import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const Chat = () => {
  // Dữ liệu tĩnh mô phỏng danh sách tin nhắn
  const [messages, setMessages] = useState([
    { id: 1, sender: 'Giảng viên', content: 'Xin chào, có điều gì bạn cần trợ giúp?' },
    { id: 2, sender: 'Sinh viên', content: 'Chào thầy, tôi có một câu hỏi về đề tài của mình.' },
    { id: 3, sender: 'Giảng viên', content: 'Vui lòng hỏi đi, tôi sẽ cố gắng giúp bạn.' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') {
      // Không gửi tin nhắn nếu nội dung rỗng
      return;
    }
    const newId = messages.length + 1;
    const newMessageObj = { id: newId, sender: 'Sinh viên', content: newMessage };
    setMessages([...messages, newMessageObj]);
    setNewMessage('');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.messagesContainer}>
        {messages.map((message) => (
          <View key={message.id} style={message.sender === 'Sinh viên' ? styles.sentMessage : styles.receivedMessage}>
            <Text>{message.sender}: {message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Nhập tin nhắn..."
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.buttonText}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  messagesContainer: {
    flexGrow: 1,
  },
  sentMessage: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-end',
    borderRadius: 10,
  },
  receivedMessage: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginBottom: 10,
    alignSelf: 'flex-start',
    borderRadius: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Chat;
