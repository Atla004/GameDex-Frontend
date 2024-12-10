import { View, StyleSheet, TextInput, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useState, useRef } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { MessageComponent } from '@/components/MessageComponent';
import { SendMessageComponent } from '@/components/SendMessageComponent';



interface DUMMY_MESSAGES {
  id: string;
  text: string;
  timestamp: Date;
  isMine: boolean;
  image?: string;
}

const DUMMY_MESSAGES = [
  {
    id: '1',
    text: 'Hey there!',
    timestamp: new Date(),
    isMine: false,
  },
  {
    id: '2',
    text: 'Hi! How are you?',
    timestamp: new Date(),
    isMine: true,
  },
  // Add more dummy messages as needed
];



export default function MessageScreen() {
  const [messages, setMessages] = useState<DUMMY_MESSAGES[]>(DUMMY_MESSAGES);
  const flatListRef = useRef<FlatList>(null);

  const handleSend = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      timestamp: new Date(),
      isMine: true,
    };
    setMessages([...messages, newMessage]);
  };

  const handleImageSend = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      const newMessage = {
        id: Date.now().toString(),
        text: '',
        image: result.assets[0].uri,
        timestamp: new Date(),
        isMine: true,
      };
      setMessages([...messages, newMessage]);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageComponent message={item} />
        )}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
      />
      
      <SendMessageComponent
        onSend={handleSend}
        onImagePress={handleImageSend}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});