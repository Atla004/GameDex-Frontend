import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

interface SendMessageComponentProps {
  onSend: (text: string) => void;
  onImagePress: () => void;
}

export function SendMessageComponent({ onSend, onImagePress }: SendMessageComponentProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage('');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onImagePress}>
        <Ionicons name="attach" size={24} color="#666" />
      </TouchableOpacity>
      
      <TextInput
        style={styles.input}
        value={message}
        onChangeText={setMessage}
        placeholder="Type a message..."
        multiline
      />
      
      <TouchableOpacity 
        style={[styles.button, styles.sendButton]}
        onPress={handleSend}
      >
        <Ionicons name="send" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginHorizontal: 10,
    maxHeight: 100,
  },
  button: {
    padding: 10,
  },
  sendButton: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
});